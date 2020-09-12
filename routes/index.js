const express = require('express');
const router = express.Router();
const logger = require("../services/logger");
const path = require('path');
const downloadFile = require('../services/downloader');
const iCalendarReader = require('../services/iCalendarReader');

router.get('/', (req, res) => {
    res.render('index', { text: "Used to validate big Data Feeds" });
})
router.post('/download_file', (req, res) => {
    async function startDownloading() {
        logger.info("=========================download_file=================");
        console.log(req.body);
        let searchedDate = req.body.startDate;
        let personioFileUrl = req.body.calendarUrl;
        let downloaded = req.body.downloaded;
        personioFileUrl.includes(" ") ? personioFileUrl = personioFileUrl.replace(' ', '+') : "";
        try {
            logger.info("Start Downloading");
            file = await downloadFile(personioFileUrl);
            file = "calendar.ics";
            logger.info("Start Reading");
            let arrayCollectionFromDate = await iCalendarReader(searchedDate);
            detectedFile = {
                status: true,
                arrayCollection: arrayCollectionFromDate,
            }
        } catch (error) {
            detectedFile = {
                status: false,
                arrayCollection: "Couldn't load file",
            }
        }

        res.json({ detectedFile });
    }
    startDownloading();
});


module.exports = router
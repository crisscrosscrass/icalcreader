const http = require('https');
const fs = require('fs');
const path = require('path');
const fileDest = path.join(__dirname + '/../downloaded/');
const fileName = 'calendar.ics';

async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(fileDest + fileName);
        const request = http.get(url, function(response) {
            response.pipe(file);
            console.log('downloading done');
            file.on('finish', function() {
                file.close();
                resolve();
            });
        });

    });
}

module.exports = downloadFile;
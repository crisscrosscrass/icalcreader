// require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require("./services/logger");
const bodyParser = require('body-parser');
const index = require('./routes/index')
const logsRouter = require('./routes/logs')
const app = express()
const port = process.env.PORT || 8060;


// console.log(process.env.SECRET_MESSAGE);

// Settings
app.set('view engine', 'ejs')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((err, req, res, next) => {
    if (!err) return next();
    return res.status(400).json({
        status: 400,
        error: 'OOps! Bad request',
    });
});
app.post(function(req, res, next) {
    next();
});


// Routing
app.use(express.static(__dirname + '/ressources'));
// app.use('/feeds', express.static(__dirname + '/feeds'));
app.use('/logs', logsRouter)
app.use('/', index)
var server = app.listen(port, '0.0.0.0', function() {
    logger.info(`Starting Server, listening to request on port ${port}`);
});
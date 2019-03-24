const formidable = require('formidable');
const appConfig = require('../config/appConfig.js');
const GlobalsManager = require('../globals.js');

// import models here

exports.test = (req, res) => {
    res.send('Yoooooooooo imageUpload.controller')
};

exports.upload = (req, res) => {
    try {
        new formidable.IncomingForm({
            uploadDir: appConfig.uploadDir,
            keepExtensions: true
        }).parse(req, (err, fields, files) => {
            if (err) {
                console.log('Error: ' + err);
                throw err;
            }
            // File {
            //     domain: null,
            //     _events: {},
            //     _eventsCount: 0,
            //     _maxListeners: undefined,
            //     size: 100598,
            //     path: '/tmp/upload_9452d0c94a5088a5ea64b3a84e86dfa6',
            //     name: 'mc.png',
            //     type: 'image/png',
            //     hash: null,
            //     lastModifiedDate: 2019-03-19T09:31:37.338Z,
            //     _writeStream: 
            //      WriteStream {
            //        _writableState: 
            //         WritableState {
            //           objectMode: false,
            //           highWaterMark: 16384,
            //           needDrain: true,
            //           ending: true,
            //           ended: true,
            //           finished: true,
            //           decodeStrings: true,
            //           defaultEncoding: 'utf8',
            //           length: 0,
            //           writing: false,
            //           corked: 0,
            //           sync: false,
            //           bufferProcessing: false,
            //           onwrite: [Function],
            //           writecb: null,
            //           writelen: 0,
            //           bufferedRequest: null,
            //           lastBufferedRequest: null,
            //           pendingcb: 0,
            //           prefinished: true,
            //           errorEmitted: false,
            //           bufferedRequestCount: 0,
            //           corkedRequestsFree: [Object] },
            //        writable: false,
            //        domain: null,
            //        _events: {},
            //        _eventsCount: 0,
            //        _maxListeners: undefined,
            //        path: '/tmp/upload_9452d0c94a5088a5ea64b3a84e86dfa6',
            //        fd: null,
            //        flags: 'w',
            //        mode: 438,
            //        start: undefined,
            //        autoClose: true,
            //        pos: undefined,
            //        bytesWritten: 100598,
            //        closed: true } }
            console.log(files.image);
            GlobalsManager.mainWindow.webContents.send('addImage', files.image.path);
            GlobalsManager.imageStorage.push(files.image.path);
        });
        // send frontend a signal with WS to update view
        res.send({
            success: true,
            message: 'Image saved sucessfully!'
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: 'The following error occured: ' + e
        });
    }
};

exports.recentImages = (req, res) => {
    res.send(GlobalsManager.imageStorage);
};

exports.receiveByteArray = (req, res) => {
    console.log(req.body);
    res.send('marc is doof!');
}
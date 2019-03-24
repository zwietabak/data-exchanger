const ip = require('ip');

module.exports = {
    "apiIPAddress": ip.address(),
    "apiPort":      1337,
    "uploadDir":    "/home/oli/Desktop/"
};
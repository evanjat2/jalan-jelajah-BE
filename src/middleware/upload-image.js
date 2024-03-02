const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024; // Image max size

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile); // Makes the exported middleware object can be used with async-await
module.exports = processFileMiddleware;

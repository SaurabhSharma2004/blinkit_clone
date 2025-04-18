const multer = require('multer');

const storage = multer.memoryStorage()

// console.log("hi before multer.js");
const upload = multer({ storage: storage })
// console.log("hi after multer.js");

module.exports = {upload}


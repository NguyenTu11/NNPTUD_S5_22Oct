const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const uploadAFileWithField = (fieldName) => upload.single(fieldName);
const uploadMultiFilesWithField = (fieldName) => upload.array(fieldName);

module.exports = {
    uploadAFileWithField,
    uploadMultiFilesWithField
};

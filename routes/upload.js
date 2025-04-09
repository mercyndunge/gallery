import multer from 'multer';
import path from 'path';

// Set Storage engine
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('image');

// Check file type
function checkFileType(file, cb) {
    // Allowed extensions
    const fileType = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = fileType.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!!');
    }
}

export default upload; // Use ES module export
import path from 'path'
import express from 'express'
import multer from 'multer'
import { log } from 'console';
const router = express.Router();

//we want on disk on server or we can use amazon bucket
const storage = multer.diskStorage({
    destination(req, file, cb) { //cb is callback
        cb(null, 'uploads/'); //where we want to save our uploads / folder 'uploads/' in the root  & null for the error
    },
    //how we want to save our file with the name
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg||peg||png/;
    const extname = filetypes.test(path.extname(file.originalname)).toLowerCase();
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
});

//only upload single image
router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`
    })
})



export default router;
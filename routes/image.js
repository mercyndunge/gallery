import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';
import { getImages, saveImage } from '../models/images.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const images = await getImages();
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching images');
    }
});

router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                try {
                    const newImage = {
                        name: req.file.filename,
                        size: req.file.size,
                        path: 'images/' + req.file.filename,
                    };
                    await saveImage(newImage);
                    res.redirect('/?msg=File uploaded successfully');
                } catch (err) {
                    console.error(err);
                    res.status(500).send('Error saving image');
                }
            }
        }
    });
});

export default router;
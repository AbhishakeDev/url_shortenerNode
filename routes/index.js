import express from 'express';
const router = express.Router();

import Url from '../models/Url.js';

//Route GET /:code
// @desc  Redirect to long/original url

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
})


export default router;
import express from 'express';
const router = express.Router();
import validUrl from 'valid-url';
import shortid from 'shortid';
import config from 'config';
import Url from '../models/Url.js';

//@route POST /api/url/shorten
//@desc  Create short url 

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    const baseUrl = config.get('baseUrl');
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json({ message: 'Invalid base URL' });
    }

    //Create url code 
    const urlCode = shortid.generate();

    //Chec long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                return res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err);

            res.status(500).json({ message: 'server error' });
        }
    } else {
        res.status(401).json('Invalid Long Url');
    }
})



export default router;
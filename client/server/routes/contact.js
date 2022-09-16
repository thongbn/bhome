import express from 'express';
import 'dotenv/config';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('contact/index', {
            publicApi: process.env.PUBLIC_API,
        });
    } catch (e) {
        next(e)
    }
});

export default router;

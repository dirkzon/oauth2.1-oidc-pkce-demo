import express from 'express';
import { getProfile } from '../controllers/index.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
    const profile = await getProfile(req.headers.authorization)
    res.send({data: profile})
})

export default router;

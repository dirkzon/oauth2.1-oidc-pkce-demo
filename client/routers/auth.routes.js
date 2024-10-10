import express from 'express';
import { login, connect } from '../controllers/index.js';

const router = express.Router();

router.get('/login', (_, res) => {
    const authorizationUrl = login();
    res.send({data: authorizationUrl});
});

router.post('/connect', async (req, res) => {
    const token = await connect(req.body.code);
    res.send({data: token});
  })

export default router;

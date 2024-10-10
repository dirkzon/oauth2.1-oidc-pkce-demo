import express from 'express';
import { login, connect } from '../controllers/index.js';

const router = express.Router();

router.get('/login', login);
router.post('/connect', connect);

export default router;

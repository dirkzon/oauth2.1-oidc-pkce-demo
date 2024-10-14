import express from 'express';
import { login, logout, connect, refreshToken } from '../controllers/index.js';

const router = express.Router();

router.get('/login', login);
router.post('/connect', connect);
router.post('/refresh', refreshToken)
router.post('/logout', logout)

export default router;

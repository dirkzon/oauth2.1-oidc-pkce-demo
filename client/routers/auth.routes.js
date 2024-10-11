import express from 'express';
import { login, logout, connect } from '../controllers/index.js';

const router = express.Router();

router.post('/login', login);
router.post('/connect', connect);
router.post('/logout', logout)

export default router;

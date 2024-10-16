import express from 'express';
import { getTravelByID } from '../controllers/index.js';

const router = express.Router();

router.get('/travel', getTravelByID)

export default router;

import express from 'express';
import { getDestinations } from "../controllers/index.js"
import { authenticateJWT } from "../middleware/index.js" 

const router = express.Router();

router.get('/destinations', authenticateJWT, getDestinations)

export default router;

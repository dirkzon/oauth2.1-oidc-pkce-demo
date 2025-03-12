import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import authRoutes from './routers/auth.routes.js';
import travelRoutes from './routers/travel.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000

app.options('*', cors())
app.use(cors({
    origin: [process.env.USER_AGENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(authRoutes)
app.use(travelRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

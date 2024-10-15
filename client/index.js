import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import authRoutes from './routers/auth.routes.js';
import profileRoutes from './routers/profile.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000

app.use(bodyParser.json());
app.use(authRoutes)
app.use(profileRoutes)

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

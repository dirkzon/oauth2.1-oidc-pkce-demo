import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import destinationsRoutes from './routes/destinations.routes.js'
import { fetchKeycloakJWKSet } from './middleware/authenticate.js';

dotenv.config();

const app = express();
const PORT = 4000

app.use(destinationsRoutes)

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

fetchKeycloakJWKSet()

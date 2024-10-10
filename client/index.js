import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import authRoutes from './routers/auth.routes.js';
import profileRoutes from './routers/profile.routes.js';

dotenv.config();

const app = express();
const PORT = 5000

app.use(bodyParser.json());
app.use(authRoutes)
app.use(profileRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

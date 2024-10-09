import express from 'express';
import bodyParser from 'body-parser'
import routes from './routes.js'

const app = express();
const PORT = 5000

app.use(bodyParser.json());
app.use(routes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

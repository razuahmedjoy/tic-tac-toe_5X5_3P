import express from 'express';
import { Express } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import { Request } from 'express';
import { gameRoutes } from './app/routes/game.routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

// Request Body Content Logging Token
morgan.token("body", (req: Request) => {
    return JSON.stringify(req.body);
});

// Request Params Content Logging Token
morgan.token("params", (req: Request) => {
    return JSON.stringify(req.params) || "-";
});

// Log HTTP requests
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms | body: :body | params: :params'
    )
);

// Routes
app.use('/api', gameRoutes());
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});


const PORT = process.env.EXPRESS_PORT || 3000;

// Store the server instance so we can close it later
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

// Export the app for testing
export default app;


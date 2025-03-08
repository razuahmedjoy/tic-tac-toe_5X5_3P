"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const game_routes_1 = require("./app/routes/game.routes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Request Body Content Logging Token
morgan_1.default.token("body", (req) => {
    return JSON.stringify(req.body);
});
// Request Params Content Logging Token
morgan_1.default.token("params", (req) => {
    return JSON.stringify(req.params) || "-";
});
// Log HTTP requests
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms | body: :body | params: :params'));
// Routes
app.use('/api', (0, game_routes_1.gameRoutes)());
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});
const PORT = process.env.EXPRESS_PORT || 3000;
// Store the server instance so we can close it later
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
// Export the app for testing
exports.default = app;

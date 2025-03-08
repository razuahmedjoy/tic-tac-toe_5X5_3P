"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRoutes = void 0;
const express_1 = require("express");
const game_controller_1 = require("../controllers/game.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const game_schema_1 = require("../validators/game.schema");
const gameRoutes = () => {
    const router = (0, express_1.Router)();
    router.post('/games', (0, validateRequest_1.validateRequest)(game_schema_1.recordGameResultSchema), game_controller_1.recordWin);
    router.get('/leaderboard', game_controller_1.getLeaderboard);
    return router;
};
exports.gameRoutes = gameRoutes;

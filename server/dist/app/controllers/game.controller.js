"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = exports.recordWin = void 0;
const game_service_1 = require("../services/game.service");
const recordWin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { winner, players } = req.body;
        const result = yield (0, game_service_1.recordGameResult)(winner, players);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error recording game result' });
    }
});
exports.recordWin = recordWin;
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, game_service_1.getLeaderboard)();
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
});
exports.getLeaderboard = getLeaderboard;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordGameResultSchema = void 0;
const zod_1 = require("zod");
exports.recordGameResultSchema = zod_1.z.object({
    winner: zod_1.z.string(),
    players: zod_1.z.array(zod_1.z.string())
});

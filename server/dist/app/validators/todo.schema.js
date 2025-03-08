"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.todoSchema = void 0;
const zod_1 = require("zod");
exports.todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be atleast 3 characters long"),
    description: zod_1.z.string().min(3, "Description must be atleast 3 characters long"),
});
exports.updateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.boolean().optional(),
});

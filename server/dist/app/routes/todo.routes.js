"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/", todo_controller_1.default.createTodo);
router.get("/", todo_controller_1.default.getUserTodos);
router.put("/:id", todo_controller_1.default.updateTodo);
router.delete("/:id", todo_controller_1.default.deleteTodo);
exports.default = router;

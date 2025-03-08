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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_service_1 = __importDefault(require("../services/todo.service"));
const todo_schema_1 = require("../validators/todo.schema");
const prismaError_service_1 = __importDefault(require("../services/prismaError.service"));
const TodoController = {
    createTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const { title, description } = todo_schema_1.todoSchema.parse(req.body);
            const userId = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            const newtodo = yield todo_service_1.default.createTodo(userId, { title, description });
            const response = {
                message: "Todo created successfully",
                todo: newtodo
            };
            res.status(201).json(response);
            return;
        }
        catch (error) {
            prismaError_service_1.default.HandlePrismaError(error, res);
            return;
        }
    }),
    getUserTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const userId = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            const todos = yield todo_service_1.default.getUserTodos(userId);
            const response = {
                message: 'Todo fetched successfully',
                todos: todos.map(todo => ({
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    status: todo.status,
                    userId: todo.userId
                })),
            };
            res.status(200).json(response);
            return;
        }
        catch (error) {
            prismaError_service_1.default.HandlePrismaError(error, res);
            return;
        }
    }),
    updateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const { title, description, status } = todo_schema_1.updateTodoSchema.parse(req.body);
            const userId = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            const updatedTodo = yield todo_service_1.default.updateTodo(userId, parseInt(req.params.id), { title, description, status });
            if (!updatedTodo) {
                res.status(404).json({ message: 'Todo not found', todo: null });
                return;
            }
            const response = {
                message: 'Todo updated successfully',
                todo: updatedTodo
            };
            res.status(200).json(response);
            return;
        }
        catch (error) {
            prismaError_service_1.default.HandlePrismaError(error, res);
            return;
        }
    }),
    deleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const userId = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            const deletedTodo = yield todo_service_1.default.deleteTodo(userId, parseInt(req.params.id));
            if (!deletedTodo) {
                res.status(404).json({ message: 'Todo not found', todo: null });
                return;
            }
            res.status(200).json({ message: 'Todo deleted successfully' });
            return;
        }
        catch (error) {
            prismaError_service_1.default.HandlePrismaError(error, res);
            return;
        }
    })
};
exports.default = TodoController;

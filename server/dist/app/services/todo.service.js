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
const prisma_client_1 = __importDefault(require("../../config/prisma.client"));
const TodoService = {
    createTodo: (userId, todoData) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_client_1.default.todo.create({
            data: {
                userId,
                title: todoData.title,
                description: todoData.description,
                status: false
            }
        });
    }),
    getUserTodos: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_client_1.default.todo.findMany({
            where: {
                userId
            }
        });
    }),
    updateTodo: (userId, todoId, todoData) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_client_1.default.todo.update({
            where: {
                id: todoId,
                userId
            },
            data: {
                title: todoData.title,
                description: todoData.description,
                status: todoData.status
            }
        });
    }),
    deleteTodo: (userId, todoId) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_client_1.default.todo.delete({
            where: {
                id: todoId,
                userId
            }
        });
    })
};
exports.default = TodoService;

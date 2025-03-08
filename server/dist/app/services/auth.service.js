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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
const prisma_client_1 = __importDefault(require("../../config/prisma.client"));
const AuthService = {
    // Function to hash password
    hashPassword: (password) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(password)
        const salt = yield bcryptjs_1.default.genSalt(10);
        //console.log(salt)
        return bcryptjs_1.default.hash(password, salt);
    }),
    // Function to compare hashed password with plain text password
    comparePassword: (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(password, hashedPassword);
    }),
    //Function to generate JWT token
    generateToken: (userId, username) => {
        return jsonwebtoken_1.default.sign({ userId, username }, app_config_1.JWT_SECRET, { expiresIn: app_config_1.JWT_EXPIRATION });
    },
    // Function to register a new user
    registerUser: (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(username, email, password);
        const hashedPassword = yield AuthService.hashPassword(password);
        console.log("creating user");
        const user = yield prisma_client_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        }).catch((error) => {
            console.log(error);
        });
        console.log(user);
        return user;
    }),
    //Function to find user by email
    findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_client_1.default.user.findUnique({
            where: {
                email
            }
        });
    })
};
exports.default = AuthService;

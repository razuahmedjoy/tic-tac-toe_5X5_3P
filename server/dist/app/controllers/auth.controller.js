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
const auth_schema_1 = require("../validators/auth.schema");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //Validating Incoming Data using Zod Validator
            const { username, email, password } = auth_schema_1.registerSchema.parse(req.body);
            //Checking if user already exists, method written in auth.service
            const isExistingUser = yield auth_service_1.default.findUserByEmail(email);
            if (isExistingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }
            //Registering User using method written in auth.service
            const user = yield auth_service_1.default.registerUser(username, email, password);
            // If user creation fails, handle the issue
            if (!user) {
                res.status(500).json({ message: "Error registering user" });
                return;
            }
            //Generating JWT Token
            const token = auth_service_1.default.generateToken(user.id, user.username);
            const response = {
                message: "User Registered Successfully",
                token,
            };
            res.status(201).json(response);
        }
        catch (error) {
            res.status(400).json({ message: "Error Registering User" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = auth_schema_1.loginSchema.parse(req.body);
            //Check if user exists
            const user = yield auth_service_1.default.findUserByEmail(email);
            if (!user) {
                res.status(400).json({ message: "User does not exist" });
                return;
            }
            //Since the user exists, check if password is correct
            const isPasswordValid = yield auth_service_1.default.comparePassword(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid Password" });
                return;
            }
            //Generate a JWT Token
            const token = auth_service_1.default.generateToken(user.id, user.username);
            const response = {
                message: "User Logged In Successfully",
                token,
            };
            //Return token to user
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ message: "Error Logging In User" });
        }
    })
};
exports.default = AuthController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const PrismaErrorService = {
    HandlePrismaError: (error, res) => {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            // Prisma known error (like a unique constraint violation)
            console.error('Known Prisma error code:', error.code); // e.g., P2002
            return res.status(400).json({
                message: 'Known Prisma error occurred',
                error: error.message,
                code: error.code,
            });
        }
        else if (error instanceof library_1.PrismaClientUnknownRequestError) {
            // Prisma unknown error (like a database query failure)
            console.error('Unknown Prisma error:', error);
            return res.status(500).json({
                message: 'Unknown Prisma error occurred',
                error: error.message,
            });
        }
        else if (error instanceof library_1.PrismaClientRustPanicError) {
            // Prisma Rust panic error (for internal errors)
            console.error('Prisma Rust panic error:', error);
            return res.status(500).json({
                message: 'Prisma Rust panic error',
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            // Any other general error
            console.error('General error:', error);
            return res.status(500).json({
                message: 'An unknown error occurred',
                error: error.message,
            });
        }
    }
};
exports.default = PrismaErrorService;

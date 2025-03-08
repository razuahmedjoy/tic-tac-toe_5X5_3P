"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate request body using the Zod schema
            schema.parse(req.body); // Throws an error if validation fails
            next(); // Continue to the next middleware or route handler
        }
        catch (err) {
            return res.status(400).json({ errors: err });
        }
    };
};
exports.validateRequest = validateRequest;

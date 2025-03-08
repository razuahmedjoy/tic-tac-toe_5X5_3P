import { Request, Response, NextFunction } from 'express';
import { Schema } from 'zod';



interface ValidateRequest {
    (schema: Schema): (req: Request, res: Response, next: NextFunction) => void;
}

export const validateRequest: ValidateRequest = (schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate request body using the Zod schema
            schema.parse(req.body); // Throws an error if validation fails
            next(); // Continue to the next middleware or route handler
        } catch (err) {
            return res.status(400).json({ errors: err });
        }
    };
};

import { NextFunction, Request, Response } from "express";

import { responseMessage } from "../../static/responseMessage";

export class RegisterUserValidationMiddleware {
    handle(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, confirmPassword } = req.body;

        if (!name) {
            res.status(422).json(responseMessage(422, "Expected 'name' field"));
        }

        if (!email) {
            res.status(422).json(responseMessage(422, "Expected 'email' field"));
        }

        if (!password) {
            res.status(422).json(responseMessage(422, "Expected 'password' field"));
        }

        if (!confirmPassword) {
            res.status(422).json(responseMessage(422, "Expected 'confirmPassword' field"));
        }

        next();
    }
}
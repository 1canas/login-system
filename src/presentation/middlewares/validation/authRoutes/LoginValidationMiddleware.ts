import { NextFunction, Request, Response } from "express";

import { responseMessage } from "../../../static/responseMessage";

export class LoginValidationMiddleware {
    handle(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if (!email) {
            res.status(422).json(responseMessage(422, "Expected 'email' field"));
        }

        if (!password) {
            res.status(422).json(responseMessage(422, "Expected 'password' field"));
        }

        next();
    }
}
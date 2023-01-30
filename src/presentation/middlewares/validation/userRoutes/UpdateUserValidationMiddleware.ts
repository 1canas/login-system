import { NextFunction, Request, Response } from "express";

import { responseMessage } from "../../../static/responseMessage";

export class UpdateUserValidationMiddleware {
    handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { password } = req.body;

        if (!id) {
            res.status(422).json(responseMessage(422, "Expected 'id' param"));   
        }

        if (!password) {
            res.status(422).json(responseMessage(422, "Expected 'password' field"));
        }
        
        next();
    }
}
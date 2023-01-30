import { NextFunction, Request, Response } from "express";

import { responseMessage } from "../../static/responseMessage";

export class GetUserValidationMiddleware {
    handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        if (!id) {
            return res.status(422).json(responseMessage(422, "Expect ID"));
        }

        next();
    }
}
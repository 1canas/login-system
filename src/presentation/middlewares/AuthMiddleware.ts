import { NextFunction, Request, Response } from "express";
import { jwtProvider } from "../../providers/securityProvider/jwt";

export class AuthMiddleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    const dateObject = new Date();
    
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        return res.status(403).json({
            statusCode: 403,
            message: "Bearer token expected",
            timestamp: dateObject.getTime()
        });
    }

    const token = bearerToken.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            statusCode: 403,
            message: "Token expected",
            timestamp: dateObject.getTime()
        });
    }

    try {
        jwtProvider.verifyToken(token);

        next();
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            message: `Invalid token: ${err}`,
            timestamp: dateObject.getTime()
        });
    }
  }
}

import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { ISecurityProvider } from "../ISecurityProvider";

export class JwtProvider implements ISecurityProvider {
    generateToken(payload: Object): string {
        const secret = process.env.SECRET || " ";

        return jwt.sign(payload, secret); 
    }

    verifyToken(token: string): string | object {
        const secret = process.env.SECRET || " ";

        return jwt.verify(token, secret);
    }

}
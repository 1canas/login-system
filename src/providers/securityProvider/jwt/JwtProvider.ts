import jwt from "jsonwebtoken";
import { ISecurityProvider } from "../ISecurityProvider";

export class JwtProvider implements ISecurityProvider {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.SECRET ?? " ";
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret); 
    }

    verifyToken(token: string): string | object {
        return jwt.verify(token, this.secret);
    }
}
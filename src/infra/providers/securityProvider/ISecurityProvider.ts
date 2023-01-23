export interface ISecurityProvider {
    generateToken(payload: object): string;
    verifyToken(token: string): string | object;
}
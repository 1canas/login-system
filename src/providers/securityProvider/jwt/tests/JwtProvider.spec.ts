import { JsonWebTokenError } from "jsonwebtoken";
import { jwtProvider } from "../index";

describe("jwt tests", () => {
    test("jwt token", () => {
        console.log(jwtProvider)
        const mockTest = {
            a: "teste123",
            b: "teste321" 
        };

        const token = jwtProvider.generateToken(mockTest);

        try {
            jwtProvider.verifyToken(token);
        } catch (err) {
            console.log(err)
            expect(err).toBe(err instanceof JsonWebTokenError);
        }
    });
});
import { Request, Response } from "express";
import { LoginUseCase } from "../../../../useCases/loginUseCase/LoginUseCase";

export class LoginController {
    constructor (
        private loginUseCase: LoginUseCase
    ) {}

    async handle(req: Request, res: Response) {
        const dateObject = new Date();

        const { email, password } = req.body;

        try {
            const token = await this.loginUseCase.execute(email, password);

            return res.status(200).json({
                statusCode: 200,
                message: "Login sucess",
                timestamp: dateObject.getTime(),
                token
            })
        } catch (error) {
            console.log(error)
            
            return res.status(500).json({
                statusCode: 500,
                message: "Server internal error",
                timestamp: dateObject.getTime()
            })
        }
    }
}
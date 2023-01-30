import { Request, response, Response } from "express";
import { IncorrectPasswordError } from "../../../useCases/loginUseCase/errors/IncorrectPasswordError";
import { UserNotFoundError } from "../../../useCases/loginUseCase/errors/UserNotFoundError";
import { LoginUseCase } from "../../../useCases/loginUseCase/LoginUseCase";
import { responseMessage } from "../../static/responseMessage";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response) {
    const dateObject = new Date();

    const { email, password } = req.body;

    try {
      const token = await this.loginUseCase.execute(email, password);

      return res.status(200).json({
        ...responseMessage(200, "Login success"),
        token,
      });

    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(204).json(responseMessage(204, error.message));
      }

      if (error instanceof IncorrectPasswordError) {
        return res.status(403).json(responseMessage(403, error.message));
      }

      return res.status(500).json(responseMessage(500, "Server internal error"));
    }
  }
}

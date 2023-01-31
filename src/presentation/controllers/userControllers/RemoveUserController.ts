import RemoveUserUseCase from "../../../useCases/userUseCases/RemoveUserUseCase";
import { Request, Response } from "express";
import { responseMessage } from "../../static/responseMessage";
import { UserNotFoundError } from "../../../errors/UserNotFoundError";
import { PasswordNotMatchError } from "../../../useCases/userUseCases/errors/PasswordNotMatchError";
import { IncorrectPasswordError } from "../../../useCases/loginUseCase/errors/IncorrectPasswordError";

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { password } = req.body;

    try {
      await this.removeUserUseCase.execute(id, password);

      return res.status(200).json(responseMessage(200, "Success on remove user"));
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(200).json(responseMessage(204, error.message));
      }

      if (error instanceof PasswordNotMatchError) {
        return res.status(403).json(responseMessage(403, error.message));
      }

      if (error instanceof IncorrectPasswordError) {
        return res.status(403).json(responseMessage(403, error.message));
      }
     
      console.log(error)
      return res.status(500).json(responseMessage(500, "Server internal error"));
    }
  }
}

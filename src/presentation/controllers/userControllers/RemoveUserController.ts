import RemoveUserUseCase from "../../../useCases/userUseCases/RemoveUserUseCase";
import { Request, Response } from "express";
import { responseMessage } from "../../static/responseMessage";
import { UserNotFoundError } from "../../../errors/UserNotFoundError";

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await this.removeUserUseCase.execute(id);

      return res.status(200).json(responseMessage(200, "Success on remove user"));
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(204).json(responseMessage(200, error.message));
      }
     
      return res.status(500).json(responseMessage(500, "Server internal error"));
    }
  }
}

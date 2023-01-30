import GetUserUseCase from "../../../useCases/userUseCases/GetUserUseCase";
import { Request, Response } from "express";
import { UserNotFoundError } from "../../../errors/UserNotFoundError";
import { responseMessage } from "../../static/responseMessage";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.getUserUseCase.execute(id);

      return res.status(200).json({ ...responseMessage(200), user });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(204).json(responseMessage(204, error.message));
      }

      return res
        .status(500)
        .json(responseMessage(500, "Server internal error"));
    }
  }
}

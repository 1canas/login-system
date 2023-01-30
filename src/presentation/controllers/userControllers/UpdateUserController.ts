import UpdateUserUseCase from "../../../useCases/userUseCases//UpdateUserUseCase";
import { Request, Response } from "express";
import { UserNotFoundError } from "../../../errors/UserNotFoundError";
import { responseMessage } from "../../static/responseMessage";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { id, name, email, password } = req.body;

    try {
      const updateUser = await this.updateUserUseCase.execute({ name, email, password }, id);

      return res.status(200).json({
        ...responseMessage(200, "Success on update user"),
        updateUser,
      });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(204).json(responseMessage(200, error.message));
      }

      return res
        .status(500)
        .json(responseMessage(500, "Server internal error"));
    }
  }
}

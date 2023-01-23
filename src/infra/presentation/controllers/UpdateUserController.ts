import UpdateUserUseCase from "../../../useCases/updateUser/UpdateUserUseCase";
import { Request, Response } from "express";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { id, name, email, password } = req.body;

    try {
      const updateUser = await this.updateUserUseCase.execute({ id, name, email, password });

      return res.status(200).json({
        statusCode: 200,
        message: "Success on update user",
        timestamp: dateObject.getTime(),
        updateUser
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        statusCode: 500,
        message: "Server internal error",
        timestamp: dateObject.getTime(),
      });
    }
  }
}

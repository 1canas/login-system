import RemoveUserUseCase from "../../../useCases/RemoveUserUseCase";
import { Request, Response } from "express";

export class RemoveUserController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { id } = req.params;

    try {
      await this.removeUserUseCase.execute({ id });

      return res.status(200).json({
        statusCode: 200,
        message: "Success on remove user",
        timestamp: dateObject.getTime()
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

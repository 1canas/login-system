import GetUserUseCase from "../../../useCases/getUser/GetUserUseCase";
import { Request, Response } from "express";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { id } = req.params;

    try {
      const user = await this.getUserUseCase.execute({ id });

      return res.status(200).json({
        statusCode: 200,
        message: "Success",
        timestamp: dateObject.getTime(),
        user
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

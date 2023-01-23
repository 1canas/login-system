import { Router } from "express";

import { userRepo } from "../../repositories/inMemoryRepo/index";
import { NodemailerProvider } from "../../providers/mailProvider/nodemailer/NodemailerProvider";

import RegisterUserUseCase from "../../../useCases/userUseCases/RegisterUserUseCase";
import { RegisterUserController } from "../../presentation/controllers/userControllers/RegisterUserController.";

import GetUserUseCase from "../../../useCases/userUseCases/GetUserUseCase";
import { GetUserController } from "../../presentation/controllers/userControllers/GetUserController";

import RemoveUserUseCase from "../../../useCases/userUseCases/RemoveUserUseCase";
import { RemoveUserController } from "../../presentation/controllers/userControllers/RemoveUserController";

import UpdateUserUseCase from "../../../useCases/userUseCases/UpdateUserUseCase";
import { UpdateUserController } from "../../presentation/controllers/userControllers/UpdateUserController";

export class UserRoutes {
  private registerUserController: RegisterUserController;
  private getUserController: GetUserController;
  private updateUserController: UpdateUserController;
  private removeUserController: RemoveUserController;

  constructor(private router: Router) {
    const mailProvider = new NodemailerProvider();

    const registerUserUseCase = new RegisterUserUseCase(
      userRepo /*, mailProvider */
    );
    const getUserUseCase = new GetUserUseCase(userRepo);
    const updateUserUseCase = new UpdateUserUseCase(userRepo);
    const removeUserUseCase = new RemoveUserUseCase(userRepo);

    this.registerUserController = new RegisterUserController(
      registerUserUseCase
    );
    this.getUserController = new GetUserController(getUserUseCase);
    this.updateUserController = new UpdateUserController(updateUserUseCase);
    this.removeUserController = new RemoveUserController(removeUserUseCase);
  }

  initRoutes(): Router {
    this.router.post("/register", (req, res) =>
      this.registerUserController.handle(req, res)
    );
    this.router.get("/:id", (req, res) =>
      this.getUserController.handle(req, res)
    );
    this.router.put("/update", (req, res) =>
      this.updateUserController.handle(req, res)
    );
    this.router.delete("/remove/:id", (req, res) =>
      this.removeUserController.handle(req, res)
    );

    return this.router;
  }
}

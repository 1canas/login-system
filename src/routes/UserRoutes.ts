import { Router } from "express";

import { userRepo } from "../repositories/inMemoryRepo/index";
import { NodemailerProvider } from "../providers/mailProvider/nodemailer/NodemailerProvider";

import RegisterUserUseCase from "../useCases/userUseCases/RegisterUserUseCase";
import { RegisterUserController } from "../presentation/controllers/userControllers/RegisterUserController";
import { RegisterUserValidationMiddleware } from "../presentation/middlewares/validation/RegisterUserValidationMiddleware";

import GetUserUseCase from "../useCases/userUseCases/GetUserUseCase";
import { GetUserController } from "../presentation/controllers/userControllers/GetUserController";
import { GetUserValidationMiddleware } from "../presentation/middlewares/validation/GetUserValidationMiddleware";

import RemoveUserUseCase from "../useCases/userUseCases/RemoveUserUseCase";
import { RemoveUserController } from "../presentation/controllers/userControllers/RemoveUserController";
import { RemoveUserValidationMiddleware } from "../presentation/middlewares/validation/RemoveUserValidationMiddleware";

import UpdateUserUseCase from "../useCases/userUseCases/UpdateUserUseCase";
import { UpdateUserController } from "../presentation/controllers/userControllers/UpdateUserController";
import { UpdateUserValidationMiddleware } from "../presentation/middlewares/validation/UpdateUserValidationMiddleware";

import { AuthMiddleware } from "../presentation/middlewares/auth/AuthMiddleware";

export class UserRoutes {
  private authMiddleware: AuthMiddleware;

  private registerUserValidationMiddleware: RegisterUserValidationMiddleware;
  private getUserValidationMiddleware: GetUserValidationMiddleware;
  private updateUserValidationMiddleware: UpdateUserValidationMiddleware;
  private removeUserValidationMiddleware: RemoveUserValidationMiddleware; 

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
        
    this.authMiddleware = new AuthMiddleware();

    this.getUserValidationMiddleware = new GetUserValidationMiddleware();
    this.registerUserValidationMiddleware = new RegisterUserValidationMiddleware();
    this.removeUserValidationMiddleware = new RemoveUserValidationMiddleware();
    this.updateUserValidationMiddleware = new UpdateUserValidationMiddleware();

    this.registerUserController = new RegisterUserController(
      registerUserUseCase
    );
    this.getUserController = new GetUserController(getUserUseCase);
    this.updateUserController = new UpdateUserController(updateUserUseCase);
    this.removeUserController = new RemoveUserController(removeUserUseCase);
  }

  initRoutes(): Router {
    this.router.post("/register", this.registerUserValidationMiddleware.handle, (req, res) =>
      this.registerUserController.handle(req, res)
    );
    this.router.get("/:id", this.authMiddleware.handle, this.getUserValidationMiddleware.handle, (req, res) =>
      this.getUserController.handle(req, res)
    );
    this.router.put("/update", this.authMiddleware.handle, this.updateUserValidationMiddleware.handle, (req, res) =>
      this.updateUserController.handle(req, res)
    );
    this.router.delete("/remove/:id", this.authMiddleware.handle, this.removeUserValidationMiddleware.handle, (req, res) =>
      this.removeUserController.handle(req, res)
    );

    return this.router;
  }
}

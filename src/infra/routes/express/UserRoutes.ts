import { Router } from "express";

import UserInMemoryRepository from "../../repositories/inMemoryRepo/UserInMemoryRepository";
import { NodemailerProvider } from "../../providers/nodemailer/NodemailerProvider";

import RegisterUserUseCase from "../../../useCases/RegisterUserUseCase";
import { RegisterUserController } from "../../presentation/controllers/RegisterUserController.";

import GetUserUseCase from "../../../useCases/GetUserUseCase";
import { GetUserController } from "../../presentation/controllers/GetUserController";

import RemoveUserUseCase from "../../../useCases/RemoveUserUseCase";
import { RemoveUserController } from "../../presentation/controllers/RemoveUserController";

import UpdateUserUseCase from "../../../useCases/UpdateUserUseCase";
import { UpdateUserController } from "../../presentation/controllers/UpdateUserController";

export class UserRoutes {
  private registerUserController: RegisterUserController;
  private getUserController: GetUserController;
  private updateUserController: UpdateUserController;
  private removeUserController: RemoveUserController;

  constructor(private router: Router) {
    const userRepo = new UserInMemoryRepository();
    const mailProvider = new NodemailerProvider();

    const registerUserUseCase = new RegisterUserUseCase(userRepo, mailProvider);
    const getUserUseCase = new GetUserUseCase(userRepo);
    const updateUserUseCase = new UpdateUserUseCase(userRepo);
    const removeUserUseCase = new RemoveUserUseCase(userRepo);

    this.registerUserController = new RegisterUserController(registerUserUseCase);
    this.getUserController = new GetUserController(getUserUseCase);
    this.updateUserController = new UpdateUserController(updateUserUseCase);
    this.removeUserController = new RemoveUserController(removeUserUseCase);
  }

  initRoutes(): Router{
    this.router.post("/register", (req, res) => this.registerUserController.handle(req, res));
    this.router.get("/:id", (req, res) => this.getUserController.handle(req, res));
    this.router.put("/update", (req, res) => this.updateUserController.handle(req, res));
    this.router.delete("/remove/:id", (req, res) => this.removeUserController.handle(req, res));

    return this.router;
  }
}
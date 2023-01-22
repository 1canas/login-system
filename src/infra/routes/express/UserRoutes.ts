import { Router } from "express";

import RegisterUserUseCase from "../../../useCases/RegisterUser/RegisterUserUseCase";
import { RegisterUserController } from "../../presentation/controllers/RegisterUserController.";
import UserInMemoryRepository from "../../repositories/inMemoryRepo/UserInMemoryRepository";
import { NodemailerProvider } from "../../providers/nodemailer/NodemailerProvider";

export class UserRoutes {
  private registerUserController: RegisterUserController;

  constructor(private router: Router) {
    const userRepo = new UserInMemoryRepository();
    const mailProvider = new NodemailerProvider();
    const registerUserUseCase = new RegisterUserUseCase(userRepo, mailProvider);

    this.registerUserController = new RegisterUserController(registerUserUseCase);
  }

  initRoutes(): Router{
    this.router.post("/register", (req, res) => this.registerUserController.handle(req, res));

    return this.router;
  }
}

// const userRoutes = Router();

// const userRepo = new UserInMemoryRepository();
// const mailProvider = new NodemailerProvider();
// const registerUserUseCase = new RegisterUserUseCase(userRepo, mailProvider);
// const registerUserController = new RegisterUserController(registerUserUseCase);

// userRoutes.post("/register", registerUserController.handle);

// userRoutes.put('/update',  userController.update);
// userRoutes.delete('/remove', authService, userController.remove);
// userRoutes.get('/:id', authService, userController.get);
import { LoginUseCase } from "../../../useCases/loginUseCase/LoginUseCase";
import { LoginController } from "../../presentation/controllers/authController/LoginController";
import UserInMemoryRepository from "../../repositories/inMemoryRepo/UserInMemoryRepository";
import { JwtProvider } from "../../providers/securityProvider/jwt/JwtProvider";
import { Router } from "express";

export class AuthRoutes {
  private loginController: LoginController;

  constructor(private router: Router) {
    const userRepo = new UserInMemoryRepository();
    const securityProvider = new JwtProvider();

    const loginUseCase = new LoginUseCase(userRepo, securityProvider);

    this.loginController = new LoginController(loginUseCase);
  }

  initRoutes() {
    this.router.post('/login', (req, res) => this.loginController.handle(req, res));

    return this.router;
  }
}

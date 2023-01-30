import { LoginUseCase } from "../useCases/loginUseCase/LoginUseCase";
import { LoginController } from "../presentation/controllers/authController/LoginController";
import { userRepo } from "../repositories/inMemoryRepo/index";
import { jwtProvider } from "../providers/securityProvider/jwt/index";
import { Router } from "express";

export class AuthRoutes {
  private loginController: LoginController;

  constructor(private router: Router) {
    const loginUseCase = new LoginUseCase(userRepo, jwtProvider);
    
    this.loginController = new LoginController(loginUseCase);
  }

  initRoutes() {
    this.router.post("/login", (req, res) =>
      this.loginController.handle(req, res)
    );

    return this.router;
  }
}

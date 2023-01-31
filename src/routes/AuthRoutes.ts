import { LoginUseCase } from "../useCases/loginUseCase/LoginUseCase";
import { LoginController } from "../presentation/controllers/authController/LoginController";
import { userRepo } from "../repositories/index";
import { jwtProvider } from "../providers/securityProvider/jwt/index";
import { Router } from "express";
import { LoginValidationMiddleware } from "../presentation/middlewares/validation/authRoutes/LoginValidationMiddleware";

export class AuthRoutes {
  private loginController: LoginController;

  private loginValidationMiddleware: LoginValidationMiddleware;

  constructor(private router: Router) {
    const loginUseCase = new LoginUseCase(userRepo, jwtProvider);

    this.loginValidationMiddleware = new LoginValidationMiddleware();

    this.loginController = new LoginController(loginUseCase);
  }

  initRoutes() {
    this.router.post("/login", this.loginValidationMiddleware.handle, (req, res) =>
      this.loginController.handle(req, res)
    );

    return this.router;
  }
}

import { NodemailerProvider } from "../../../providers/mailProvider/nodemailer/NodemailerProvider";
import { JwtProvider } from "../../../providers/securityProvider/jwt/JwtProvider";
import UserInMemoryRepository from "../../../repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../../IUserDTO";
import RegisterUserUseCase from "../../userUseCases/RegisterUserUseCase";
import { LoginUseCase } from "../LoginUseCase";

describe("login user case", () => {
  test("generate token", async () => {
    const jwtSecurityProvider = new JwtProvider();

    const inMemoryRepo = new UserInMemoryRepository();

    const registerUserService = new RegisterUserUseCase(
      inMemoryRepo
    );

    const registerUserDTO: IUserDTO = {
      email: "teste234@test.com",
      name: "teste",
      password: "teste102030",
    };

    const savedUser = await registerUserService.execute(registerUserDTO);
    const loginUseCase = new LoginUseCase(inMemoryRepo, jwtSecurityProvider);

    const token = await loginUseCase.execute(savedUser.email, registerUserDTO.password);

    expect(() => jwtSecurityProvider.verifyToken.bind(token)).not.toThrow();
  });
});

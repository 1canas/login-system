import { NodemailerProvider } from "../../../infra/providers/mailProvider/nodemailer/NodemailerProvider";
import { JwtProvider } from "../../../infra/providers/securityProvider/jwt/JwtProvider";
import UserInMemoryRepository from "../../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../../IUserDTO";
import RegisterUserUseCase from "../../userUseCases/RegisterUserUseCase";
import { LoginUseCase } from "../LoginUseCase";

describe("login user case", () => {
  test("generate token", async () => {
    const jwtSecurityProvider = new JwtProvider();

    const inMemoryRepo = new UserInMemoryRepository();
    const nodemailerProvider = new NodemailerProvider();

    const registerUserService = new RegisterUserUseCase(
      inMemoryRepo,
      nodemailerProvider
    );

    const registerUserDTO: IUserDTO = {
      email: "teste234@test.com",
      name: "teste",
      password: "teste102030",
    };

    const savedUser = await registerUserService.execute(registerUserDTO);
    const loginUseCase = new LoginUseCase(inMemoryRepo, jwtSecurityProvider);

    const bearerToken = await loginUseCase.execute(savedUser.email, registerUserDTO.password);

    const token = bearerToken.split(' ')[1];

    expect(jwtSecurityProvider.verifyToken(token)).not.toThrow();
  });
});

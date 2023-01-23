import { ISecurityProvider } from "../../infra/providers/securityProvider/ISecurityProvider";
import IUserRepository from "../../infra/repositories/IUserRepository";

export class LoginUseCase {
  constructor(
    private userRepo: IUserRepository,
    private securityProvider: ISecurityProvider
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new Error("user not found");
    }

    if (!user.comparePassword(password)) {
      throw new Error("password not match");
    }

    return this.securityProvider.generateToken(user.toObject());
  }
}

import { ISecurityProvider } from "../../providers/securityProvider/ISecurityProvider";
import IUserRepository from "../../repositories/IUserRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";
import { IncorrectPasswordError } from "./errors/IncorrectPasswordError";

export class LoginUseCase {
  constructor(
    private userRepo: IUserRepository,
    private securityProvider: ISecurityProvider
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    if (!user.comparePassword(password)) {
      throw new IncorrectPasswordError("Incorrect Password");
    }

    return this.securityProvider.generateToken(user.toObject());
  }
}

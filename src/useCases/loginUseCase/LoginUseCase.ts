import { ISecurityProvider } from "../../providers/securityProvider/ISecurityProvider";
import IUserRepository from "../../repositories/IUserRepository";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { IncorrectPasswordError } from "./errors/IncorrectPasswordError";
import User from "../../entities/User";

export class LoginUseCase {
  constructor(
    private userRepo: IUserRepository,
    private securityProvider: ISecurityProvider
  ) {}

  async execute(email: string, password: string) {
    const userExists = await this.userRepo.getByEmail(email);

    if (!userExists) {
      throw new UserNotFoundError("User not found");
    }

    const user = new User({...userExists, password});

    if (!user.comparePassword(password)) {
      throw new IncorrectPasswordError("Incorrect Password");
    }

    return this.securityProvider.generateToken(user.toObject());
  }
}

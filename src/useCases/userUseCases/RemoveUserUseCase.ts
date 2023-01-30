import { UserNotFoundError } from "../../errors/UserNotFoundError";
import IUserRepository from "../../repositories/IUserRepository";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import { IncorrectPasswordError } from "../loginUseCase/errors/IncorrectPasswordError";
import { PasswordNotMatchError } from "./errors/PasswordNotMatchError";

export default class RemoveUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string, password: string, confirmPassword: string): Promise<void> {
    const user = await this.userRepo.getById(id);

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    if (password !== confirmPassword) {
      throw new PasswordNotMatchError("Password and confirm password doesnt match");
    }

    if (!user.comparePassword(password)) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    await this.userRepo.remove(id);
  }
}

import { UserNotFoundError } from "../../errors/UserNotFoundError";
import IUserRepository from "../../repositories/IUserRepository";

import { IncorrectPasswordError } from "../loginUseCase/errors/IncorrectPasswordError";

export default class RemoveUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string, password: string): Promise<void> {
    const user = await this.userRepo.getById(id);

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    if (!user.comparePassword(password)) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    await this.userRepo.remove(id);
  }
}

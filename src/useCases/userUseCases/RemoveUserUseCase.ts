import User from "../../entities/User";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import IUserRepository from "../../repositories/IUserRepository";

import { IncorrectPasswordError } from "../loginUseCase/errors/IncorrectPasswordError";

export default class RemoveUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string, password: string): Promise<void> {
    const userModel = await this.userRepo.getById(id);

    if (!userModel) {
      throw new UserNotFoundError("User not found");
    }

    const user = new User({ ...userModel, password }, userModel.id);

    if (!user.comparePassword(password)) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    await this.userRepo.remove(id);
  }
}

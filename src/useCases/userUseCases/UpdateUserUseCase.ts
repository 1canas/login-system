import User from "../../entities/User";

import IUserRepository from "../../repositories/IUserRepository";
import { IUserDTO } from "../IUserDTO";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { IncorrectPasswordError } from "../loginUseCase/errors/IncorrectPasswordError";

export default class UpdateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(toModify: IUserDTO, id: string, inputedPassword: string): Promise<IUserDTO> {
    const userExists = await this.userRepo.getById(id);

    if (!userExists) {
      throw new UserNotFoundError("User not found");
    }

    if (!userExists.comparePassword(inputedPassword)) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    const user = new User({ ...userExists, password: inputedPassword }, id);

    const { email, name } = toModify;

    if (email) {
      user.updateEmail(email);
    }

    if (name) {
      user.updateName(name);
    }

    await this.userRepo.update(user);

    return user.toObject();
  }
}

import User from "../../entities/User";

import IUserRepository from "../../repositories/IUserRepository";
import { IUserDTO } from "../IUserDTO";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import { UserNotFoundError } from "../../errors/UserNotFoundError";

export default class UpdateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userDTO: IUserDTO, id: string): Promise<IUserDTO> {
    const userExists = await this.checkUserExistence(id);

    if (!userExists) {
      throw new UserNotFoundError("User not found");
    }

    const user = new User(userDTO, id);

    await this.userRepo.update(user);

    return user.toObject();
  }

  public async checkUserExistence(id: string): Promise<boolean> {
    const checkedUser = await this.userRepo.getById(id);

    return isNotNullUndefined(checkedUser);
  }
}

import User from "../../entities/User";

import IUserRepository from "../../infra/repositories/IUserRepository";
import { IUpdateUserDTO } from "./IUpdateUserDTO";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";

export type UpdateUserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export default class UpdateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: IUpdateUserDTO): Promise<UpdateUserOutput> {
    const userExists = await this.checkUserExistence(input.id);

    if (!userExists) {
      throw new Error("User not found");
    }

    const user = new User(input, input.id);

    await this.userRepo.update(user);

    return user.toObject();
  }

  public async checkUserExistence(id: string): Promise<boolean> {
    const checkedUser = await this.userRepo.getById(id);

    return isNotNullUndefined(checkedUser);
  }
}

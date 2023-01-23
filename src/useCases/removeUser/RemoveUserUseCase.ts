import IUserRepository from "../../infra/repositories/IUserRepository";
import { IRemoveUserDTO } from "./IRemoveUserDTO";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";

export type RemoveUserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export default class RemoveUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: IRemoveUserDTO): Promise<void> {
    const userExists = await this.checkUserExistence(input.id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.userRepo.remove(input.id);
  }

  public async checkUserExistence(id: string): Promise<boolean> {
    const checkedUser = await this.userRepo.getById(id);

    return isNotNullUndefined(checkedUser);
  }
}

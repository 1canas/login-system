import IUserRepository from "../../infra/repositories/IUserRepository";

import { isNotNullUndefined } from "../../utils/isNotNullUndefined";

export default class RemoveUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.checkUserExistence(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.userRepo.remove(id);
  }

  public async checkUserExistence(id: string): Promise<boolean> {
    const checkedUser = await this.userRepo.getById(id);

    return isNotNullUndefined(checkedUser);
  }
}

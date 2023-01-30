import { UserNotFoundError } from "../../errors/UserNotFoundError";
import IUserRepository from "../../repositories/IUserRepository";
import { IUserDTO } from "../IUserDTO";

export default class GetUserUseCase {
    constructor(
        private userRepo: IUserRepository
    ) {}

    async execute(id: string): Promise<IUserDTO> {
        const user = await this.userRepo.getById(id);

        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        return user.toObject();
    }
}
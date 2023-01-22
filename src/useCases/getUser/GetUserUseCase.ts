import IUserRepository from "../../infra/repositories/IUserRepository";
import { IGetUserDTO } from "./IGetUserDTO";

export type GetUserOutput = {
    id: string,
    name: string,
    email: string,
    password: string
}

export default class GetUserUseCase {
    constructor(
        private userRepo: IUserRepository
    ) {}

    async execute(input: IGetUserDTO): Promise<GetUserOutput> {
        const user = await this.userRepo.getById(input.id);

        if (!user) {
            throw new Error('User not found');
        }

        return user.toObject();
    }
}
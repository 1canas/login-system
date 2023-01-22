import User from "../entities/User";
import IUserRepository from "../infra/db/UserRepositoryInterface";
import { isNotNullUndefined } from "../utils/isNotNullUndefined";
import { UserExistsError } from "./errors/UserErrors";

export type RegisterUserInput = {
    name: string,
    email: string,
    password: string
}

export type RegisterUserOutput = {
    id: string,
    name: string,
    email: string,
    password: string
}

export default class RegisterUser {
    constructor(
        private userRepo: IUserRepository 
    ) {}
    
    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const isEmailExist = await this.checkEmailExistence(input.email);
        
        if (isEmailExist) {
            throw new UserExistsError("A user with this email already exists");
        }

        const user = new User(input);

        await this.userRepo.save(user);

        return JSON.parse(user.toJSON());
    }

    public async checkEmailExistence(email: string): Promise<boolean> {
        const checkedEmail = await this.userRepo.getByEmail(email);

        return isNotNullUndefined(checkedEmail);
    }
}
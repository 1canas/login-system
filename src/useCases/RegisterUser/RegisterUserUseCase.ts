import User from "../../entities/User";
import IMailProvider from "../../infra/providers/IMailProvider";
import IUserRepository from "../../infra/repositories/IUserRepository";
import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import { IRegisterUserDTO } from "./IRegisterUserDTO";

export type RegisterUserOutput = {
    id: string,
    name: string,
    email: string,
    password: string
}

export default class RegisterUser {
    constructor(
        private userRepo: IUserRepository,
        private mailProvider: IMailProvider
    ) {}
    
    async execute(input: IRegisterUserDTO): Promise<RegisterUserOutput> {
        const userAlreadyExist = await this.checkUserExistence(input.email);
        
        if (userAlreadyExist) {
            throw new Error("A user with this email already exists");
        }

        const user = new User(input);

        await this.userRepo.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                address: user.email
            },
            from: {
                name: 'Welcome Company',
                address: 'welcome@teste.com'
            },
            subject: "Welcome",
            body: "<span>Welcome to our login sistem example"
        })

        return user.toObject();
    }

    public async checkUserExistence(email: string): Promise<boolean> {
        const checkedUser = await this.userRepo.getByEmail(email);

        return isNotNullUndefined(checkedUser);
    }
}
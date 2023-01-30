import User from "../../entities/User";
import IMailProvider from "../../providers/mailProvider/IMailProvider";
import IUserRepository from "../../repositories/IUserRepository";
import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import {UserAlreadyExistError} from "./errors/UserAlreadyExistsError";
import { IUserDTO } from "../IUserDTO";
import {PasswordNotMatchError} from "./errors/PasswordNotMatchError";

export type RegisterUserInput<T extends {}> = T & {
    confirmPassword: string
};

export default class RegisterUserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private mailProvider?: IMailProvider
    ) {}
    
    async execute(userDTO: RegisterUserInput<IUserDTO>): Promise<Required<IUserDTO>> {
        if (userDTO.password !== userDTO.confirmPassword) {
            throw new PasswordNotMatchError("Password do not match");
        }

        const userAlreadyExist = await this.checkUserExistence(userDTO.email);
        
        if (userAlreadyExist) {
            throw new UserAlreadyExistError("A user with this email already exists");
        }

        const user = new User(userDTO);

        await this.userRepo.save(user);

        if (this.mailProvider) {
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
                body: `<span>Welcome to our login sistem example: ${user.name}`
            })
        }

        return user.toObject();
    }

    public async checkUserExistence(email: string): Promise<boolean> {
        const checkedUser = await this.userRepo.getByEmail(email);

        return isNotNullUndefined(checkedUser);
    }
}
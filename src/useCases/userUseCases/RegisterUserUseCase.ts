import User from "../../entities/User";
import IMailProvider from "../../infra/providers/mailProvider/IMailProvider";
import IUserRepository from "../../infra/repositories/IUserRepository";
import { isNotNullUndefined } from "../../utils/isNotNullUndefined";
import { IUserDTO } from "../IUserDTO";

export default class RegisterUserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private mailProvider: IMailProvider
    ) {}
    
    async execute(userDTO: IUserDTO): Promise<Required<IUserDTO>> {
        const userAlreadyExist = await this.checkUserExistence(userDTO.email);
        
        if (userAlreadyExist) {
            throw new Error("A user with this email already exists");
        }

        const user = new User(userDTO);

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
            body: `<span>Welcome to our login sistem example: ${user.name}`
        })

        return user.toObject();
    }

    public async checkUserExistence(email: string): Promise<boolean> {
        const checkedUser = await this.userRepo.getByEmail(email);

        return isNotNullUndefined(checkedUser);
    }
}
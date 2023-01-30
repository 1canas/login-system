import { NodemailerProvider } from "../../../providers/mailProvider/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../../repositories/inMemoryRepo/UserInMemoryRepository";
import RegisterUserUseCase, { RegisterUserInput } from "../RegisterUserUseCase";
import GetUserUseCase from "../GetUserUseCase";
import { IUserDTO } from "../../IUserDTO";

describe('get user usecase', () => {
    test('return user', async () => {
        const inMemoryRepo = new UserInMemoryRepository();

        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo);

        const userDTO: RegisterUserInput<IUserDTO> = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
            confirmPassword: "teste102030"
        };

        const savedUser = await registerUserService.execute(userDTO);

        const getUserService = new GetUserUseCase(inMemoryRepo);

        const findedUser = await getUserService.execute(savedUser.id);
        expect(savedUser.id).toEqual(findedUser.id);
    })
});
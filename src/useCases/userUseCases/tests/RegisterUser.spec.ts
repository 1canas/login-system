import { NodemailerProvider } from "../../../infra/providers/mailProvider/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../../IUserDTO";
import RegisterUserUseCase from "../RegisterUserUseCase";

describe('register user usecase', () => {
    test('register user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerUserDTO: IUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(registerUserDTO);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(savedUser).toStrictEqual({
            ...registerUserDTO,
            password: savedUser.password,
            id: inMemoryRepo.userList[0].id
        });
    });

    test('register user exception case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();
        

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerInput: IUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        }
        
        expect(registerUserService.checkUserExistence(registerInput.email)).toBeTruthy();
    });
})
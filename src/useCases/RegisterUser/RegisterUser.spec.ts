import { NodemailerProvider } from "../../infra/providers/nodemailer/nodemailerService";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IRegisterUserDTO } from "./IRegisterUserDTO";
import RegisterUser from "./RegisterUserUseCase";

describe('register user usecase', () => {
    test('register user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUser(inMemoryRepo, nodemailerProvider);

        const registerInput: IRegisterUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(registerInput);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(savedUser).toStrictEqual({
            ...registerInput,
            id: inMemoryRepo.userList[0].id
        });
    });

    test('register user exception case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();
        

        const registerUserService = new RegisterUser(inMemoryRepo, nodemailerProvider);

        const registerInput: IRegisterUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        }
        
        expect(registerUserService.checkUserExistence(registerInput.email)).toBeTruthy();
    });
})
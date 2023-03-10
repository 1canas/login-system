import { NodemailerProvider } from "../../../providers/mailProvider/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../../repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../../IUserDTO";
import RegisterUserUseCase, { RegisterUserInput } from "../RegisterUserUseCase";

describe('register user usecase', () => {
    test('register user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo);

        const registerUserDTO: RegisterUserInput<IUserDTO> = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
            confirmPassword: "teste102030"
        };

        expect(JSON.parse(JSON.stringify(registerUserDTO.password))).toEqual(registerUserDTO.confirmPassword);

        const savedUser = await registerUserService.execute(registerUserDTO);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(savedUser.id).toEqual(inMemoryRepo.userList[0].id);
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
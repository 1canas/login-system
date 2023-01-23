import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IRegisterUserDTO } from "../RegisterUser/IRegisterUserDTO";
import RegisterUserUseCase from "../RegisterUser/RegisterUserUseCase";
import { IUpdateUserDTO } from "./IUpdateUserDTO";
import UpdateUserUseCase from "./UpdateUserUseCase";

describe('register user usecase', () => {
    test('register user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerUserDTO: IRegisterUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const {id} = await registerUserService.execute(registerUserDTO);

        const updateUserService = new UpdateUserUseCase(inMemoryRepo);

        const updateUserDTO: IUpdateUserDTO = {
            id,
            email: "teste236@test.com",
            name: "teste123",
            password: "teste102030",
        };

        const updatedUser = await updateUserService.execute(updateUserDTO);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(updatedUser).toStrictEqual(updateUserDTO);
    });
})
import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../IUserDTO";
import RegisterUserUseCase from "../RegisterUser/RegisterUserUseCase";
import UpdateUserUseCase from "./UpdateUserUseCase";

describe('update user usecase', () => {
    test('update user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerUserDTO: IUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const {id} = await registerUserService.execute(registerUserDTO);

        const updateUserService = new UpdateUserUseCase(inMemoryRepo);

        const updateUserDTO: IUserDTO = {
            email: "teste236@test.com",
            name: "teste123",
            password: "teste102030",
        };

        const updatedUser = await updateUserService.execute(updateUserDTO, id);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(updatedUser).toStrictEqual({...updateUserDTO, id});
    });
})
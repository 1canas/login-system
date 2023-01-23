import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import { IRegisterUserDTO } from "../RegisterUser/IRegisterUserDTO";
import RegisterUserUseCase from "../RegisterUser/RegisterUserUseCase";
import { IRemoveUserDTO } from "./IRemoveUserDTO";
import RemoveUserUseCase from "./RemoveUserUseCase";

describe('remove user usecase', () => {
    test('remove user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerUserDTO: IRegisterUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(registerUserDTO);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(savedUser).toStrictEqual({
            ...registerUserDTO,
            id: inMemoryRepo.userList[0].id
        });

        const removeUserService = new RemoveUserUseCase(inMemoryRepo);

        const removeUserDTO: IRemoveUserDTO = {
            id: savedUser.id
        };

        await removeUserService.execute(removeUserDTO);

        expect(inMemoryRepo.userList).toHaveLength(0);
    });
})
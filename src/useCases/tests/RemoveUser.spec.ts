import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import RegisterUserUseCase from "../RegisterUserUseCase";
import { IUserDTO } from "../IUserDTO";
import RemoveUserUseCase from "../RemoveUserUseCase";

describe('remove user usecase', () => {
    test('remove user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const registerUserDTO: IUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(registerUserDTO);

        const removeUserService = new RemoveUserUseCase(inMemoryRepo);

        await removeUserService.execute(savedUser.id);

        expect(inMemoryRepo.userList).toHaveLength(0);
    });
})
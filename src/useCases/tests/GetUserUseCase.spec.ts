import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import RegisterUserUseCase from "../RegisterUserUseCase";
import GetUserUseCase from "../GetUserUseCase";
import { IUserDTO } from "../IUserDTO";

describe('get user usecase', () => {
    test('return user', async () => {
        const inMemoryRepo = new UserInMemoryRepository();

        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo, nodemailerProvider);

        const userDTO: IUserDTO = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(userDTO);

        const getUserService = new GetUserUseCase(inMemoryRepo);

        const findedUser = await getUserService.execute(savedUser.id);
        expect(findedUser).toStrictEqual({
            ...userDTO,
            password: savedUser.password,
            id: inMemoryRepo.userList[0].id
        });
    })
});
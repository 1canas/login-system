import { NodemailerProvider } from "../../infra/providers/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../infra/repositories/inMemoryRepo/UserInMemoryRepository";
import RegisterUserUseCase from "../registerUser/RegisterUserUseCase";
import GetUserUseCase from "./GetUserUseCase";
import { IUserDTO } from "../IUserDTO";

describe('get user usecase', () => {
    test('return user', async () => {
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
            id: inMemoryRepo.userList[0].id
        });

        const getUserService = new GetUserUseCase(inMemoryRepo);

        const findedUser = await getUserService.execute(savedUser.id);
        expect(findedUser).toStrictEqual({
            ...registerUserDTO,
            id: inMemoryRepo.userList[0].id
        });
    })
});
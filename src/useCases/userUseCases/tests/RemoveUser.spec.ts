import { NodemailerProvider } from "../../../providers/mailProvider/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../../repositories/inMemoryRepo/UserInMemoryRepository";
import RegisterUserUseCase, { RegisterUserInput } from "../RegisterUserUseCase";
import { IUserDTO } from "../../IUserDTO";
import RemoveUserUseCase from "../RemoveUserUseCase";

describe('remove user usecase', () => {
    test('remove user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo);

        const registerUserDTO: RegisterUserInput<IUserDTO> = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
            confirmPassword: "teste102030"
        };

        const savedUser = await registerUserService.execute(registerUserDTO);

        const removeUserService = new RemoveUserUseCase(inMemoryRepo);

        await removeUserService.execute(savedUser.id, registerUserDTO.password);

        expect(inMemoryRepo.userList).toHaveLength(0);
    });
})
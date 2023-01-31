import { NodemailerProvider } from "../../../providers/mailProvider/nodemailer/NodemailerProvider";
import UserInMemoryRepository from "../../../repositories/inMemoryRepo/UserInMemoryRepository";
import { IUserDTO } from "../../IUserDTO";
import RegisterUserUseCase, { RegisterUserInput } from "../RegisterUserUseCase";
import UpdateUserUseCase from "../UpdateUserUseCase";

describe('update user usecase', () => {
    test('update user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const nodemailerProvider = new NodemailerProvider();

        const registerUserService = new RegisterUserUseCase(inMemoryRepo);

        const registerUserDTO: RegisterUserInput<IUserDTO> = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
            confirmPassword: "teste102030"
        };

        const {id} = await registerUserService.execute(registerUserDTO);

        const updateUserService = new UpdateUserUseCase(inMemoryRepo);

        const updateUserDTO: IUserDTO = {
            email: "teste236@test.com",
            name: "teste123",
            password: "qaaaaaaaaaaaaaaaaa"
        };

        const updatedUser = await updateUserService.execute(updateUserDTO, id, registerUserDTO.password);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(updatedUser).toStrictEqual({...updateUserDTO, password: updatedUser.password, id});
    });
})
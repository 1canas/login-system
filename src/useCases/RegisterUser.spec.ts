import UserInMemoryRepository from "../infra/db/UserInMemoryRepository";
import RegisterUser, { RegisterUserInput } from "./registerUser";

describe('register user usecase', () => {
    test('register user normal case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const registerUserService = new RegisterUser(inMemoryRepo);

        const registerInput: RegisterUserInput = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        };

        const savedUser = await registerUserService.execute(registerInput);

        expect(inMemoryRepo.userList).toHaveLength(1);
        expect(savedUser).toStrictEqual({
            ...registerInput,
            id: inMemoryRepo.userList[0].id
        })
    });

    test('register user exception case', async () => {
        const inMemoryRepo = new UserInMemoryRepository();
        const registerUserService = new RegisterUser(inMemoryRepo);

        const registerInput: RegisterUserInput = {
            email: "teste234@test.com",
            name: "teste",
            password: "teste102030",
        }
        
        expect(registerUserService.checkEmailExistence(registerInput.email)).toBeTruthy();
    });
})
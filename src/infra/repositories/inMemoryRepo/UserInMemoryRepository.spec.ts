import User, { UserProps } from "../../../entities/User";
import UserInMemoryRepository from "./UserInMemoryRepository";

describe("user in memory repository", () => {
  test("save user", () => {
    const inMemoryRepo = new UserInMemoryRepository();

    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    inMemoryRepo.save(user);

    expect(inMemoryRepo.userList).toHaveLength(1);
    expect(inMemoryRepo.userList).toStrictEqual([user]);
  });

  test("get user by email", async () => {
    const inMemoryRepo = new UserInMemoryRepository();

    const userProps: UserProps = {
      email: "teste123@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    inMemoryRepo.save(user);

    expect(inMemoryRepo.userList).toHaveLength(1);
    expect(inMemoryRepo.userList).toStrictEqual([user]);

    const findedUser = await inMemoryRepo.getByEmail(user.email);
    expect(findedUser).toBe(user);
  });
});

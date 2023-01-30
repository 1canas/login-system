import User, { UserProps } from "../User";

describe("User tests", () => {
  test("constructor", () => {
    const userProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps, "aaaaa");

    expect(user.id).toBe("aaaaa");
    expect({name: user.name, email: user.email, password: user.hashedPassword}).toStrictEqual({...userProps, password: user.hashedPassword});
  });

  test("update name", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect({name: user.name, email: user.email, password: user.hashedPassword}).toStrictEqual({...userProps, password: user.hashedPassword});

    const newName = "newName@teste.com";
    user.updateName(newName);

    expect(user.name).toBe(newName);
  });

  test("update email", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect({name: user.name, email: user.email, password: user.hashedPassword}).toStrictEqual({...userProps, password: user.hashedPassword});

    const newMail = "newMail@teste.com";
    user.updateEmail(newMail);

    expect(user.email).toBe(newMail);
  });

  test("update password", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    const newPassword = "teste302010";

    expect(user.id).toBeDefined();
    expect({name: user.name, email: user.email, password: user.hashedPassword}).toStrictEqual({...userProps, password: user.hashedPassword});

    user.updatePassword(newPassword);

    expect(user.comparePassword(newPassword)).toBeTruthy();
  });

  test("user to json", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect({name: user.name, email: user.email, password: user.hashedPassword}).toStrictEqual({...userProps, password: user.hashedPassword});

    const userObject = user.toObject();

    expect(userObject).toStrictEqual({ name: user.name, email: user.email, password: user.hashedPassword, id: user.id });
  });
});

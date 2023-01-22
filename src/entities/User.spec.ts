import User, { UserProps } from "./User";

describe("User tests", () => {
  test("constructor", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect(user.props).toStrictEqual(userProps);
  });

  test("update name", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect(user.props).toStrictEqual(userProps);

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
    expect(user.props).toStrictEqual(userProps);

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
    expect(user.props).toStrictEqual(userProps);

    user.updatePassword(newPassword);

    expect(user.password).toBe(newPassword);
  });

  test("user to json", () => {
    const userProps: UserProps = {
      email: "teste@test.com",
      name: "teste",
      password: "teste102030",
    };

    const user = new User(userProps);

    expect(user.id).toBeDefined();
    expect(user.props).toStrictEqual(userProps);

    const userObject = user.toJSON();

    expect(userObject).toBe(JSON.stringify({ ...user.props, id: user.id }));
  });
});

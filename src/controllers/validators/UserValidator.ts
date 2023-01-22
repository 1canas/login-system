import { User } from "../../infra/repositories/mongoDB/models/User";

type bodyPayload = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validateRegisterInput(payload: bodyPayload) {
  const { name, email, password, confirmPassword } = payload;

  if (!name) {
    return {
      validate: false,
      message: "Expected 'name' field",
    };
  }

  if (!email) {
    return {
      validate: false,
      message: "Expected 'email' field",
    };
  }

  if (!password) {
    return {
      validate: false,
      message: "Expected 'passwword' field",
    };
  }

  if (password !== confirmPassword) {
    return {
      validate: false,
      message: "Password and confirm password must be equals",
    };
  }

  return {
    validate: true,
  };
}

async function verifyUserAlreadyExist(email: string) {
  const user = await User.findOne({ email });

  if (user) {
    return {
      validate: false,
      message: "User already exists",
    };
  }

  return {
    validate: true,
  };
}

export const userValidator = {
    validateRegisterInput,
    verifyUserAlreadyExist
};

import { User } from "../models/User";

import bcrypt from "bcrypt";

export class UserService {
  async saveUser(user: { name: string; email: string; password: string }) {
    const { password } = user;

    try {
        const salt = await bcrypt.genSalt(10);
        const saltedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ ...user, password: saltedPassword });
        
        const { _id } = await newUser.save();
    
        return _id;

    } catch (error) {
        throw error;
    }
  }
}

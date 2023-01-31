import User, { IUserDAO } from "./models/User";
import IUserRepository from "../IUserRepository";

export class UserCollection implements IUserRepository {
  async save(userDAO: IUserDAO): Promise<void> {
    const user = new User(userDAO);
    user._id = userDAO.id;

    await user.save();
  }

  async update(id: string, userDAO: IUserDAO): Promise<void> {
    await User.findByIdAndUpdate(id, userDAO);
  }

  async remove(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async getById(id: string): Promise<Omit<IUserDAO, "hashedPassword"> | null> {
    return await User.findById(id, "-password");
  }

  async getByEmail(email: string): Promise<IUserDAO | null> {
    return await User.findOne({ email });
  }

  async listAll(): Promise<IUserDAO[]> {
    return await User.find({});
  }
}

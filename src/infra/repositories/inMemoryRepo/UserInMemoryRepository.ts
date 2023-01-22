import User from "../../../entities/User";
import IUserRepository from "../IUserRepository";

export default class UserInMemoryRepository implements IUserRepository {
    userList: User[] = []
    
    async save(user: User): Promise<void> {
        await this.userList.push(user);
    }
    
    async getById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
    async getByEmail(email: string): Promise<User | undefined> {
        return await this.userList.find(user => user.email === email);
    }

    listAll(): User[] {
        throw new Error("Method not implemented.");
    }
}
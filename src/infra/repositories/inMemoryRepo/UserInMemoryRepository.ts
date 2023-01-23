import User from "../../../entities/User";
import IUserRepository from "../IUserRepository";

export default class UserInMemoryRepository implements IUserRepository {
    userList: User[] = []
    
    async save(user: User): Promise<void> {
        await this.userList.push(user);
    }

    async update(toUpdateUser: User): Promise<void> {
        const userIndex = this.userList.findIndex(user => user.id === toUpdateUser.id);
        await this.userList.splice(userIndex, 1, toUpdateUser);
    }

    async remove(id: string): Promise<void> {
        const userIndex = this.userList.findIndex(user => user.id === id);
        await this.userList.splice(userIndex, 1);
    }
     
    async getById(id: string): Promise<User | undefined> {
        return await this.userList.find(user => user.id === id);
    }
    
    async getByEmail(email: string): Promise<User | undefined> {
        console.log(this.userList)
        return await this.userList.find(user => user.email === email);
    }

    listAll(): User[] {
        throw new Error("Method not implemented.");
    }
}
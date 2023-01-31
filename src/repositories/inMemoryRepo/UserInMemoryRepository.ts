import User, { UserProps } from "../../entities/User";
import { IUserDTO } from "../../useCases/IUserDTO";
import IUserRepository from "../IUserRepository";

export default class UserInMemoryRepository implements IUserRepository {
    userList: IUserDTO[] = []
    
    async save(user: IUserDTO): Promise<void> {
        await this.userList.push(user);
    }

    async update(toUpdateUser: IUserDTO): Promise<void> {
        const userIndex = this.userList.findIndex(user => user.id === toUpdateUser.id);
        await this.userList.splice(userIndex, 1, toUpdateUser);
    }

    async remove(id: string): Promise<void> {
        const userIndex = this.userList.findIndex(user => user.id === id);
        await this.userList.splice(userIndex, 1);
    }
     
    async getById(id: string): Promise<IUserDTO | undefined> {
        return await this.userList.find(user => user.id === id);
    }
    
    async getByEmail(email: string): Promise<IUserDTO | undefined> {
        return await this.userList.find(user => user.email === email);
    }

    async listAll(): Promise<IUserDTO[]> {
        return this.userList;
    }
}
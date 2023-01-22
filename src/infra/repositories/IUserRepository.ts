import User from "../../entities/User";

export default interface IUserRepository {
    save(user: User): Promise<void>;
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User | undefined>;
    listAll(): User[];
}
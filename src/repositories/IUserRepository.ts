import User, { UserProps } from "../entities/User";

export default interface IUserRepository {
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    remove(id: string): Promise<void>;
    getById(id: string): Promise<Omit<User, 'hashedPassword'> | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    listAll(): User[];
}
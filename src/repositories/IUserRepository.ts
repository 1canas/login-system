import User, { UserProps } from "../entities/User";
import { IUserDTO } from "../useCases/IUserDTO";


export default interface IUserRepository {
    save(user: Omit<IUserDTO, 'id'>): Promise<void>;
    update(user: Omit<IUserDTO, 'password'>): Promise<void>;
    remove(id: string): Promise<void>;
    getById(id: string): Promise<Omit<IUserDTO, 'hashedPassword'> | undefined>;
    getByEmail(email: string): Promise<IUserDTO | undefined>;
    listAll(): Promise<IUserDTO[]>;
}
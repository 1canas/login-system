import { IUserDTO } from "../useCases/IUserDTO";

export default interface IUserRepository {
    save(user: IUserDTO): Promise<void>;
    update(id: string, user: Omit<IUserDTO, 'password'>): Promise<void>;
    remove(id: string): Promise<void>;
    getById(id: string): Promise<Omit<IUserDTO, 'hashedPassword'> | null>;
    getByEmail(email: string): Promise<IUserDTO | null>;
    listAll(): Promise<IUserDTO[]>;
}
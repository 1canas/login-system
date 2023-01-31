import UserInMemoryRepository from "./inMemoryRepo/UserInMemoryRepository";
import {UserCollection}  from "./mongoDB/UserCollection";


// const userRepo = new UserInMemoryRepository();
const userRepo = new UserCollection();

export { userRepo }
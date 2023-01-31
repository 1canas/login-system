import mongoose from "mongoose";

export interface IUserDAO {
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    name: {type: 'string', require: true},
    email: {type: 'string', require: true, unique: true},
    password: {type: 'string', require: true}
})

const User = mongoose.model('User', userSchema);

export default User;
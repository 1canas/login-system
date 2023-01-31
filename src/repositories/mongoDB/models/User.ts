import mongoose from "mongoose";

export interface IUserDAO {
    id: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    _id: {type: 'string', require: true, unique: true},
    name: {type: 'string', require: true},
    email: {type: 'string', require: true, unique: true},
    password: {type: 'string', require: true}
}, {_id: false})

const User = mongoose.model('User', userSchema);

export default User;
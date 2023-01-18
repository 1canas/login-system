import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: 'string',
    email: 'string',
    password: 'string'
})

export default mongoose.model('User', userSchema);
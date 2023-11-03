import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    token: String,
    role: {
        type: String,
        default: 'user'
    },
    file: {type:Object}

});
const users = mongoose.model('usersSchema',userSchema)
export {users}
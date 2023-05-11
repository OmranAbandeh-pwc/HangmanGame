import mongoose, { model, Schema } from "mongoose"

export const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
}, { collection: "users" });

const User = model("user", userSchema)

export default User;
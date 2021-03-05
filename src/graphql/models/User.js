import { model, Schema } from "mongoose"

 const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
})


export const User = model('User', userSchema)


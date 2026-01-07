import mongoose from 'mongoose'
import { Role } from '../@types/enum.ts';

export const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:[true, 'First name is required']
    },
    last_name:{
        type: String,
        required:[true, 'Last name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required']
    },
    profile_image: {
        required:[true,"Profile Required"],
        type: {
            path: String,
            public_id:String,
            
        },
        
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    role:{
        type:String,
        enum: Object.values(Role),
        default:Role.USER

    }

},{ timestamps: true })
const User = mongoose.model('user', UserSchema)
export default User
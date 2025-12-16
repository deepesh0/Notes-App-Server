import mongoose from 'mongoose'
import { Role } from '../@types/enum.types';

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
    profile:{
        type:{
            path:String,
            public_id:String
        },
        required:[true, 'Profile is required']  
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    Role:{
        type:String,
        enum: object.values(Role),
        default:Role.USER

    }

},{ timestamps: true })
const User = mongoose.model('user', UserSchema)
export default User
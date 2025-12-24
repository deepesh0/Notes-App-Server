import { Role } from "./enum";
import mongoose from 'mongoose';

export interface Iplayload {
    _id:mongoose.Types.ObjectId,
    first_name:string,
    last_name:string,
    Role:Role,
    email:string
}

import mongoose, {Document, Schema} from "mongoose";
import {UserType} from "../types/user.type";
const UserSchema: Schema = new Schema<UserType>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        firstName: {type: String},
        lastName: {type: String},
        role: 
        {type: String, 
            enum: ['admin', 'user'], 
            default: 'user'
            }
    },
    {
        timestamps: true //auto createdAt and updatedAt fields
    }
);
export interface IUser extends UserType, Document {//combine usertype and document
    _id: mongoose.Types.ObjectId; //mongo related attribute/ custom attributes
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = mongoose.model<IUser>('User', UserSchema);
//userModel is the mongoose model for User collection
//db.users in mongodb
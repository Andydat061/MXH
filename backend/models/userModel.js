import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        dob:{
            type: Date,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
            required: false
        },
    }
);
export const User = mongoose.model('User', userSchema);
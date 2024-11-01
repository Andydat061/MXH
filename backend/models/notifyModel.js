import mongoose from "mongoose";

const notifySchema = mongoose.Schema(
    {
        userID:{
            type: String,
            required: true
        },
        actorID:{
            type: String,
            required: true
        },
        actionDetail:{
            type: String,
            required: true
        }
    }
);
export const Notify = mongoose.model('Notify', notifySchema);
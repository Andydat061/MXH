import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
        articleID:{
            type: String,
            required: true
        },
        userID:{
            type: String,
            required: true
        },
        reportDetail:{
            type: String,
            required: true
        },
        publishDate:{
            type: Date,
            required: true,
            default: Date.now
        }
    }
);
export const Report = mongoose.model('Report', reportSchema);
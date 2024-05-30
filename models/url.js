import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timeStamp: {
            type: Number
        }
    }],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{timeStamp:true})


const URL = mongoose.model('url',urlSchema);

export default URL;
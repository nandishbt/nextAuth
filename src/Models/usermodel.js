import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    isverified: {
        type: Boolean,
        default: false,
    },

    isAdmin:{
        type: Boolean,
        default: false,
    },

    forgotpasswordToken : String,
    forgotpasswordTokenExpires: Date,
    verificationToken: String,
    verificationExpires: Date,
},{timestamps:true})


const User = mongoose.models.users || mongoose.model('users',userSchema )

export default User
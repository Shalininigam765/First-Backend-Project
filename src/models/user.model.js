import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {                       //cloudenary url
        type: String,
        required: true
    },
    coverImage: {                   //cloudnary url
        type: String
    },
    watchHistory: {                     
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =function (){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
    })
    process.env.ACCESS_TOKEN,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
}

userSchema.methods.generateRefreshToken =function (){
    return jwt.sign({
        _id: this._id,
        
    })
    process.env.REFRESH_TOKEN,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    }
}

userSchema.methods.generateRefreshToken =function (){}

export const User = mongoose.model("User", userSchema)
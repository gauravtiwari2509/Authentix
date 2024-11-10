import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        profilePhoto: {
            type: String,
        },        
        accountStatus: {
            type: String,
            enum: [ "NONE","VERIFIED", "WALLET_BINDED"],
            default: "NONE",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        walletId: {
            type: Schema.Types.ObjectId,
            ref: "Wallet"
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


UserSchema.methods.generateAccessToken = function () {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
        }
        if (!process.env.ACCESS_TOKEN_EXPIRY) {
            throw new Error('ACCESS_TOKEN_EXPIRY is not defined in environment variables');
        }

        return jwt.sign(
            {
                _id: this._id,
                username: this.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw new Error('Error generating access token');
    }
};

UserSchema.methods.generateRefreshToken = function () {
    try {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
        }
        if (!process.env.REFRESH_TOKEN_EXPIRY) {
            throw new Error('REFRESH_TOKEN_EXPIRY is not defined in environment variables');
        }

        return jwt.sign(
            {
                _id: this._id,
                username: this.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        );
    } catch (error) {
        console.error('Error generating refresh token:', error.message);
        throw new Error('Error generating refresh token');
    }
};


export const User = mongoose.model("User", UserSchema);
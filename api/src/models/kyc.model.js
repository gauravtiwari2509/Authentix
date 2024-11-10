import mongoose, { Schema } from "mongoose";

const kycSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },
        hashedAadhar: {
            type: String,
            required: true,
        },
        verificationStatus: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending",
        },
        kycRejectedReason: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export const Kyc = mongoose.model("Kyc", kycSchema);

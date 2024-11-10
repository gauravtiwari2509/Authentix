import mongoose from 'mongoose'
const PostSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        postHash: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        postSignature: {
            type: String,
            required: true,
        },
        postType: {
            type: String,
            enum: ["text", "image", "video"],
            default: "text",
        },
        content: {
            type: String,
            required: true,
        },
        mediaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);


export const Post = mongoose.model("Post", PostSchema);

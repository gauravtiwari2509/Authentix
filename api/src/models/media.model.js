import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    mediaURL: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    resolution: {
      type: String,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);



export const Media = mongoose.model("Media", MediaSchema);

import mongoose from "mongoose";

const WalletSchema = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true,
      },
      publicKey: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
      },
      authSignature: {
        type: String,
        required: true,
      },
      walletProvider: {
        type: String,
        enum: ["MetaMask", "Phantom", "WalletConnect"],
        default: "MetaMask",
      },
      walletBoundDate: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );
  
export const Wallet= mongoose.model("Wallet", WalletSchema);
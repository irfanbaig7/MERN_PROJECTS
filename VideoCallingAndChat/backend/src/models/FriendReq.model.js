import mongoose from "mongoose";

const friendsReqSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "accepted"],
        default: "Pending"
    }
}, { timestamps: true })

const FriendRequest = mongoose.model("FriendRequest", friendsReqSchema)

export default FriendRequest
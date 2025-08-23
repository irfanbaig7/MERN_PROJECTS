import FriendRequest from "../models/FriendReq.model.js";
import User from "../models/User.js"



export const getRecomendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id
        const currentUser = req.user

        // here we get recommended user
        const recommendedUser = await User.find({
            _id: {
                $ne: currentUserId,
                $nin: currentUser.friends
            },
            isOnboarded: true
        })

        res.status(200).json(recommendedUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside getRecomendedUsers",
        });
    }
}
export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullname profilePic nativeLanguage learingLanguage")
        res.status(200).json(user.friends)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside getMyfriends",
        });
    }
}


export const sendFriendReq = async (req, res) => {
    try {
        const myId = req.user.id
        const { id: recipientId } = req.params

        if (myId === recipientId) {
            res.status(400).json({ message: "You can't send friend request to yourself !!" })
        }

        const recipient = await User.findById(recipientId)
        if (!recipient) {
            res.status(400).json({ message: "Recipient not found !!" })
        }

        // check if we are already friend's

        if (recipient.friends.includes(myId)) {
            res.status(400).json({ message: "You are already friends with this user" })
        }

        // check if req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })

        if (existingRequest) {
            return res.status(400).json({ message: "A friend req already exists between, you and this user" })
        }

        // finally we can create a friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })

        res.status(200).json({ message: "Friend request Created successfully", friendRequest })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside sendFriendrequest",
        });
    }
}


export const acceptFriendReq = async (req, res) => {
    try {
        const { id: requestId } = req.params
        const friendRequest = await FriendRequest.findById(requestId)

        if (!friendRequest) {
            return res.status(400).json({ message: "friend req not found" })
        }

        // Verify the current user is the recipent
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "Your are not authorized to accept this request" })
        }


        friendRequest.status = "accepted"
        await friendRequest.save()

        // add each user to the other's friends array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        })

        res.status(200).json({ message: "Frd request accepted" })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Somthing went wrong inside acceptFriendrequest"
        })
    }
}


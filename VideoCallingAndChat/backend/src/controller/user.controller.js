import User from "../models/User.js";


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
            error: "Something went wrong. inside Login",
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
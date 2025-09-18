import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {

    try {
        const { fullname, email, password } = req.body;
        if (!email || !password || !fullname) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        // check existing user
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email alredy exists" })
        }

        // creating random index to between 1 to 100
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        // Creating a new user in db
        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: randomAvatar, // for every new signup user have there random-gen avatar
        })

        // create the user in STREAM
        // for make sepreate try catch for stream user
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullname,
                image: newUser.profilePic || "",
            })
            log(`Stream user created for ${newUser.fullname}`);
        } catch (streamError) {
            log("Error updating Stream user during onboarding:", streamError.message);
        }


        // gen a jwt-token
        const token = jwt.sign({ userId: newUser._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        // save this gen token into cookies
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({
            success: true, user: newUser, message: "Signup successfully"
        })
        log("Signup successfully");


    } catch (error) {
        error("Onboarding error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email" })
        }

        // compare password
        const isPassCorrect = await user.matchPassword(password)
        if (!isPassCorrect) {
            return res.status(401).json({ message: "Invalid password" })
        }


        // gen a jwt-token
        const token = jwt.sign({ userId: user._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        // save this gen token into cookies
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        // give success response
        res.status(200).json({
            success: true, message: "Login successfully", user
        })
        log("Login successfully");


    } catch (error) {
        error("Onboarding error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const logout = async (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({ message: "LogOut successfully" })
}

export const onboard = async (req, res) => {
    // log(req.user);
    try {

        const userId = req.user._id
        const { fullname, bio, nativeLanguage, learingLanguage, location } = req.body
        // log(fullname, bio, nativeLanguage, learingLanguage, location); 
        if (!fullname || !bio || !nativeLanguage || !learingLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullname && "fullname",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learingLanguage && "learingLanguage",
                    !location && "location"
                ].filter(Boolean)
            })
        }
        // update user in db
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true })

        if (!updatedUser) return res.status(404).json({ message: "User not found" })

        // update user in STREAM
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullname,
                image: updatedUser.profilePic,
            })
            log(`Stream user updated after onboarding for ${updatedUser.fullname}`);
        } catch (error) {
            log("Error creating Stream user : ", error.message);
        }

        res.status(200).json({ success: true, user: updatedUser })

    } catch (error) {
        log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside Login",
        });
    }

}
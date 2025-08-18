import User from "../models/User.js";
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {

    try {
        const { fullname, email, password } = req.body;
        if (!email || !password || !fullname) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        // check existing user
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "Email alredy exists" })
        }

        // creating random index to between 1 to 100
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        // Creating a new user
        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: randomAvatar, // for every new signup user have there random-gen avatar
        })


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
        console.log("Signup successfully");


    } catch (error) {
        res.status(500).json({
            error: "Something went wrong. inside SignUp",
        });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(401).json({ message: "Invalid email" })
        }

        // compare password
        const isPassCorrect = await existUser.matchPassword(password)
        if (!isPassCorrect) {
            return res.status(401).json({ message: "Invalid password" })
        }


        // gen a jwt-token
        const token = jwt.sign({ userId: existUser._id, }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        // save this gen token into cookies
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        // give success response
        res.status(200).json({
            success: true, message: "Login successfully", existUser
        })
        console.log("Login successfully");


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside Login",
        });
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "LogOut successfully" })
}
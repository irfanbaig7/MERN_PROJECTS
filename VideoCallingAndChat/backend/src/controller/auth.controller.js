import { User } from "../models/user.model";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body()

    try {
        // valiadations 
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

        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({ message: "Email alredy exists" })
        }


        // creating random index to between 1 to 100
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        // Creating a new user
        const newUser = new User.create({
            fullname,
            email,
            password,
            profilPic: randomAvatar,
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
            success: true, user: newUser
        })

    } catch (error) {
        res.status(500).json({
            error: "Something went wrong. inside SignUp-user",
        });
    }

}
export const login = async (req, res) => {
    res.send("Login User")
}
export const logout = async (req, res) => {
    res.send("Logout User")
}
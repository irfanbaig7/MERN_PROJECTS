import  User  from "../models/User.js";
import jwt from "jsonwebtoken"
import { z } from "zod"


// here we use zod for validation
const signUpschema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
})


export const signup = async (req, res, next) => {

    try {
        // valiadations with using zod
        // if (!email || !password || !fullname) {
        //     return res.status(400).json({ message: "All fields are required" })
        // }

        // if (password < 6) {
        //     return res.status(400).json({ message: "Password must be at least 6 characters" })
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ message: "Invalid email format" })
        // }


        // validate req
        const result = signUpschema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: result.error.errors[0].message,
            })
        }
        console.log(result);
        

        const { fullname, email, password } = result.data;

        // check existing user
        console.log(email);
        const existUser = await User.findOne({ email })
        console.log(existUser);
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
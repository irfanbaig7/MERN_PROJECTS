// user ka jwt token cookie aayega hamare pass and onbording ki req ke saath hame ye jwt token bhejenge, fhir ham usko validate karenge, agr validation sahi raha to response me usko access mile ga onboard route ka warna to error..


import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protectedRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message : "Unauthorized - no token provided or user will be Loged out" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decoded) {
            return res.status(401).json({ message : "Unauthorized - invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({ message : "Unauthorized - User not found" })
        }

        req.user = user;

        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside Login",
        });
    }
}


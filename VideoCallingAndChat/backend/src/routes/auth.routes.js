import express, { Router } from "express"
import { login, logout, onboard, signup } from "../controller/auth.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"
const authRoutes = express.Router()

authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)

authRoutes.post("/onboarding", protectedRoute, onboard)

authRoutes.get("/me", protectedRoute, (req, res) => {
    res.status(200).json({ message: "Logged in", success: true, user: req.user })
})

export default authRoutes   
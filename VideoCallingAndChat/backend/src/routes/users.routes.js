import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { getMyFriends, getRecomendedUsers } from "../controller/user.controller.js"


const userRoutes = express.Router()

// apply auth middleware to all routes
userRoutes.use(protectedRoute)

userRoutes.get("/", getRecomendedUsers)
userRoutes.get("/friends", getMyFriends)



export default userRoutes
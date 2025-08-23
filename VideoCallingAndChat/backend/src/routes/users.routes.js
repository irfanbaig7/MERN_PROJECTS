import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { acceptFriendReq, getfriendRequest, getMyFriends, getOutGoingFriendRequest, getRecomendedUsers, sendFriendReq } from "../controller/user.controller.js"


const userRoutes = express.Router()

// apply auth middleware to all routes
userRoutes.use(protectedRoute)

userRoutes.get("/", getRecomendedUsers)
userRoutes.get("/friends", getMyFriends)


userRoutes.post("/friend-request/:id", sendFriendReq)
userRoutes.put("/friend-request/:id/accept", acceptFriendReq)

userRoutes.get("/friend-requests", getfriendRequest)

userRoutes.get("/outgoing-friend-requests", getOutGoingFriendRequest)



export default userRoutes
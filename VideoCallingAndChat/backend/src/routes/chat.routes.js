import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { getStreamToken } from "../controller/chat.controller.js"
const chatRoutes = express.Router()

chatRoutes.get("/token", protectedRoute, getStreamToken)

export default chatRoutes
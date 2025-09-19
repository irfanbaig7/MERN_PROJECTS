import express from "express"
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import cors from "cors"

const app = express()

// cummunicate with the fronend using cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow to frontend send the cookies
}))

app.use(express.json())
app.use(cookieParser()) // now u can accesable to use cookies inside ur request

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server start successfully");
    connectDB()
})
import express from "express"
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser()) // now u can accesable to use cookies inside ur request

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server start successfully");
    connectDB()
})
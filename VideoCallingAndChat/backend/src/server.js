import express from "express"
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";

const app = express()

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log("Connected successfully");
    connectDB()
})
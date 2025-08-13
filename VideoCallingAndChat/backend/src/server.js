import express from "express"
import authRoutes from "./routes/auth.routes.js";

const app = express()

app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log("Connected successfully");
    
})
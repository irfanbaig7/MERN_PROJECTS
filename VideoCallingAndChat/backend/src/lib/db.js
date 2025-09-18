import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        log('MongoDB connected SuccessFully');
    } catch (err) {
        error('❌ DB connection error:', err);
        process.exit(1) // 1 means failure
    }
};
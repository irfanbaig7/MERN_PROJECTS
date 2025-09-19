
import { generateStreamToken } from "../lib/stream.js";
export const getStreamToken = async (req, res) => {
    try {
        const token = generateStreamToken(req.user.id)
        res.status(200).json({ message: "token finded", token })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Something went wrong. inside getStreamToken",
        });
    }
}
import { StreamChat } from "stream-chat" 
const apikey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apikey || !apiSecret) {
    error("Stream api or secret missing"); 
}

// lets created stream client using this client we communicate the stream application
const streamClient = StreamChat.getInstance(apikey, apiSecret);


// make a function that's allow us to create a user
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        error("Error upserting stream user", error);
    }
} 


export const generateStreamToken = (userId) => {
    try {
        // Ensure the userid are string
        const userIdStr = userId.toString() 
        log(streamClient.createToken(userIdStr));
        return streamClient.createToken(userIdStr)
    } catch (error) {
        error("Error generateStreamToken", error);
    }
}


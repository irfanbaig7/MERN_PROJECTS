import { StreamChat } from "stream-chat" 
const apikey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apikey || !apiSecret) {
    console.error("Stream api or secret missing");

    
}

// lets created stream client using this client we communicate the stream application
const streamClient = StreamChat.getInstance(apikey, apiSecret);


// make a function that's allow us to create a user
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("Error upserting stream user", error);
    }
} 


export const generateStreamToken = (userId) => {

}


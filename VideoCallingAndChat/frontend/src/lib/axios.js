import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true // send the cookies with the request
})


// again and again call the same path is not do approch thats why use this function that help to clean and optimize code
// http://localhost:5001/api this is always same 



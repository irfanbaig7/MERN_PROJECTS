import { axiosInstance } from "./axios.js"

export const signUp = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData)
    return response.data
}


// this is endpoint for check user login or not.
export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me")
        return response.data
    } catch (error) {
        console.log("Error accure inside getAuth : ", error);
        return null;
    }
}


// here we cerete a function for onboarding
export const complateOnboarding = async (onboardData) => {
    const response = await axiosInstance.post("/auth/onboarding", onboardData)
    return response.data
}



// create a login function for mutationFn
export const logIn = async (logInData) => {
    const res = await axiosInstance.post("/auth/login", logInData)
    return res.data
}

// create a LogOut function for mutationFn
export const logOut = async () => {
    const res = await axiosInstance.post("/auth/logout")
    return res.data
}
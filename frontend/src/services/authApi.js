import axios from "axios";
const API_URL = "http://localhost:5000/api/auth"

// REGISTER

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/register`, userData
    );
    return response.data;
}

// LOGIN 
export const loginUser = async(userData)=>{
    const response = await axios.post(
        `${API_URL}/login`, userData
    );
    return response.data;
}

// GETPROFILE
export const getProfile = async (token) => {
    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headerseads:{
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

// UPDATE PROFILE
export const updateProfile = async (token, userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

// CHANGE PASSWORD
export const changePassword = async (token, passwordData) => {
    const response = await axios.put(`${API_URL}/profile`, passwordData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
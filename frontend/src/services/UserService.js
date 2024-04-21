import axios from "axios"

export const signInUser = async (data) => {
    console.log('data', data);
    const res = ((await axios.post(`${process.env.REACT_API_URL_BACKEND}/api/v1/auth/authenticate`, data)));
    return res.data;
}

export const signUpUser = async (data) => {
    console.log('data', data);
    const res = ((await axios.post(`${process.env.REACT_API_URL_BACKEND}/api/v1/auth/register`, data)));
    return res.data;
}
import axios from "axios"

export const getHeader = () => {
    const token = localStorage.getItem("access_token");
    console.log('token ', token);
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'

    }
}

export const signInUser = async (data) => {
    const res = ((await axios.post(`${process.env.REACT_API_URL_BACKEND}/api/v1/auth/authenticate`, data)));
    return res.data;
}

export const signUpUser = async (data) => {
    const res = ((await axios.post(`${process.env.REACT_API_URL_BACKEND}/api/v1/auth/register`, data)));
    return res.data;
}

export const getUserProfile = async (email, token) => {
    try {
        const res = await axios.get(`${process.env.REACT_API_URL_BACKEND}/api/v1/users/details/email=${email}`, {
            headers: getHeader()
        });
        return res.data;
    } catch(e) {
        throw e;
    }
}
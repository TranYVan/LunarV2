import axios from "axios";
import { getHeader } from "../utils/Utils";

export const signInUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_API_URL_BACKEND}/api/v1/auth/authenticate`,
    data
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_API_URL_BACKEND}/api/v1/auth/register`,
    data
  );
  return res.data;
};

export const getUserProfile = async (email, token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/users/details/email=${email}`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getUserProfileById = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/users/details/id=${id}`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};


export const updateUser = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/users/id=${id}`,
      data,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/users/get-all`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/users/create`,
      user,
      {
        headers: getHeader(),
      }
    );
  } catch (error) {
    throw error;
  }
};

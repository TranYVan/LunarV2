import axios from "axios";
import { getHeader } from "../utils/Utils";

export const getAllCategory = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/categories/get-all`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const createCategory = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/categories`, data, {
        headers: getHeader()
      });
    
    return res;
  } catch (error) {
    throw error;
  }
}
import axios from "axios";

export const getAllCategory = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/categories/get-all`);
    return res.data;
  } catch (e) {
    throw e;
  }
};
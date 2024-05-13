import axios from "axios";
import { getHeader } from "../utils/Utils";

export const createOrder = async (order) => {

  try {
    const res = await axios.post(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/orders`,
      order,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};
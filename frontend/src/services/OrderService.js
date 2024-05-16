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

export const getOrderByUserId = async (userId) => {

  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/orders/get-by-user-id/${userId}`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getOrderDetailById = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/orders/details/${id}`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}

export const cancelOrderById = async (id) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/orders/cancel/${id}`,
      null,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}
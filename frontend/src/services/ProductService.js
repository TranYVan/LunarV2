import axios from "axios";
import { getHeader } from "../utils/Utils";

export const getAllProducts = async (search, page = 0, size = 8) => {
  let res = {};
  
  try {
    if (search.length > 0) {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/api/v1/products?page=${page}&size=${size}&filter=name&filter=${search}`);
    } else {
      res = await axios.get(
        `${process.env.REACT_API_URL_BACKEND}/api/v1/products?page=${page}&size=${size}`);
    }
    return res.data;
  } catch (e) {
    throw e;
  }
  // try {
  //   const res = await axios.get(
  //     `${process.env.REACT_API_URL_BACKEND}/api/v1/products`
  //   );
  //   console.log('res ', res?.data);
  //   return res.data;

  // } catch (error) {
  //   throw error;
  // }
};

export const createProduct = async (product) => {
  console.log("productt ", product);

  try {
    const res = await axios.post(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/products`,
      product,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getDetailProduct = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/products/id=${id}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/products/id=${id}`,
      payload,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/products/id=${id}`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteManyProduct = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/products/delete-many`,
      data.ids,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

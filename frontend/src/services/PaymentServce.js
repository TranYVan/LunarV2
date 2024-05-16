import axios from "axios";
import { getHeader } from "../utils/Utils";

export const getConfig = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/api/v1/payments/config`,
      {
        headers: getHeader(),
      }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}
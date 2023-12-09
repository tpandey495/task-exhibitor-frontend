// api.js
import { Base_URL, METHOD_TYPE } from "./constant";
import jwtInterceptor from "./jwtinterceptor";

export const fetchAndProcesd = async (url, method, data) => {
  try {
    const options = {
      baseURL: Base_URL,
      url: url,
      method: method,
      params: method === METHOD_TYPE.GET ? data : null,
      data: method !== METHOD_TYPE.GET ? data : null,
    };
    const response = await jwtInterceptor(options);
    return response.data; // Return the response data
  } catch (error) {
    // If an error occurs, throw an error object with an appropriate message
    if (error?.response?.data?.message) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error("An error occurred while making the request.");
    }
  }
};
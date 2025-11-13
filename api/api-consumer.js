import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const request = async (endpoint, newParams = {}, method = "GET", body = {}) => {
  const params = {
    key: process.env.API_KEY,
    token: process.env.API_TOKEN,
    ...newParams,
  };
  try {
    const response = await axios({
      baseURL: process.env.API_URL,
      url: endpoint,
      method: method,
      params: params,
      data: method !== "GET" ? body : undefined,
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `❌ Error ${error.response.status}:`,
        error.response.data?.message || error.response.data,
      );
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.response.message);
    }
  }
};

export const get = (endpoint, params = {}) => request(endpoint, params, "GET");
export const post = (endpoint, params, body) =>
  request(endpoint, params, "POST", body);
export const put = (endpoint, params, body) =>
  request(endpoint, params, "PUT", body);
export const patch = (endpoint, params, body) =>
  request(endpoint, params, "PATCH", body);
export const remove = (endpoint, params) => request(endpoint, params, "DELETE");

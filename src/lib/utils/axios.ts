import axios from "axios";

const BASE_URL = process.env.BASE_API_URL;

export default axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

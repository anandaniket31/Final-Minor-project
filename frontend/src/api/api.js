import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const predictCrop = async (data) => {
  const res = await API.post("/api/predict", data);
  return res.data;
};

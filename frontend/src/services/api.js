import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-system-hnnj.onrender.com",
});

export default API;

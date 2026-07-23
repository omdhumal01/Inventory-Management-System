import axios from "axios";


const api = axios.create({
  baseURL: "https://inventory-management-system-9h83.onrender.com/api",
});


export default api;
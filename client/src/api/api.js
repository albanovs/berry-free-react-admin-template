import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:4000",
// });

const api = axios.create({
    baseURL: "https://erp-services-8an7.onrender.com",
});

export default api;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://tia-27sj.onrender.com/api",
});

export default instance;

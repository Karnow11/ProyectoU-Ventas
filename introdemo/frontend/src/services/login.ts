import axios from "axios";
//import axiosSecure from "../utils/axiosSecure";

type Credentials = {
    username: string;
    password: string;
};

// crea un cliente con baseURL del backend y cookies habilitadas
const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrf = localStorage.getItem("csrfToken");
  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

const login = async (credentials: Credentials) => {
    const response = await api.post("/api/login", credentials);
    const csrfToken = response.headers["x-csrf-token"];
    if (csrfToken) {
        localStorage.setItem("csrfToken", csrfToken);
        console.log("Se guarda el token");
    }
    return response.data;
};

const restoreLogin = async () => {
    try {
        const response = await api.get("/api/login/me");
        return response.data;
    } catch {
        return null;
    }
};

const logout = async () => {
    await api.post("/api/login/logout");
    localStorage.removeItem("csrfToken");
};

export default { login, restoreLogin, logout };
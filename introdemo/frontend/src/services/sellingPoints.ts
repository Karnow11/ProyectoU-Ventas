import axios from "axios";
// crea un cliente con baseURL del backend y cookies habilitadas

const baseURL = "http://localhost:3001"
const api = axios.create({
    baseURL,
    withCredentials: true,
});

const getAll = async () => {
    const response = await api.get("/api/selling_points/");
    return response.data;
};

export default { getAll };
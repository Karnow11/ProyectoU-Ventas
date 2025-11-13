import axios from "axios";
import { type sellingPoint } from "../types/sellingPoint";
// crea un cliente con baseURL del backend y cookies habilitadas

interface Props {
    name: string,
    static_point: boolean,
    product_type: string,
    description: string
}

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

const getAll = async () => {
    const response = await api.get("/api/selling_points/");
    return response.data;
};

const addSelling = async ({name, static_point, product_type, description}: Props) => {
    const sellingObject: Omit <sellingPoint, "id"> = {
      name: name,
      static_point,
      product_type,
      description
    }

    await api.post("/api/selling_points", sellingObject)
}

export default { getAll, addSelling };
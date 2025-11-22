import axios from "axios";
import type { sellingPoint, SPZone, ProductType } from "../types/sellingPoint";
// crea un cliente con baseURL del backend y cookies habilitadas

interface Props {
    name: string,
    static_point: boolean,
    product_type: ProductType,
    description: string,
    zone: SPZone
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

export const getAll = async () => {
    const response = await api.get("/api/selling_points/");
    return response.data;
};

export const addSelling = async ({name, static_point, product_type, description, zone}: Props) => {
    const sellingObject: Omit <sellingPoint, "id"> = {
      name: name,
      static_point,
      product_type,
      description,
      zone
    }

    const data = (await api.post("/api/selling_points", sellingObject)).data
    return data
}

export const getSellingPointsByZone = async( zone: SPZone) => {
  const allSP: sellingPoint[] = await getAll();
  const StaticSP: sellingPoint[] = allSP.filter(sp => sp.static_point === true);
  const filteredSP: sellingPoint[] = StaticSP.filter(sp => sp.zone === zone);
  return filteredSP;
}

export default { getAll, addSelling, getSellingPointsByZone };
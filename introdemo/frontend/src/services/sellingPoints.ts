import { type SellingPoint } from "../types/sellingPoint";
import api from "../utils/axiosSecure";
// crea un cliente con baseURL del backend y cookies habilitadas

const getAll = async () => {
    const response = await api.get("/api/selling_points/");
    return response.data;
};

const addSelling = async ({name, static_point, product_type, description}: Omit <SellingPoint, "id" | "user_id">) => {
    const sellingObject: Omit <SellingPoint, "id" | "user_id"> = {
      name,
      static_point,
      product_type,
      description
    }

    await api.post("/api/selling_points", sellingObject)
}

export default { getAll, addSelling };
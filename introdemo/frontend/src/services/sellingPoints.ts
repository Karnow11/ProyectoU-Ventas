import { type sellingPoint } from "../types/sellingPoint";
import api from "../utils/axiosSecure";
// crea un cliente con baseURL del backend y cookies habilitadas

const getAll = async () => {
    const response = await api.get("/api/selling_points/");
    return response.data;
};

const addSelling = async ({name, user_id, static_point, product_type, description}: sellingPoint) => {
    const sellingObject: Omit <sellingPoint, "id"> = {
      name,
      user_id,
      static_point,
      product_type,
      description
    }

    await api.post("/api/selling_points", sellingObject)
}

export default { getAll, addSelling };
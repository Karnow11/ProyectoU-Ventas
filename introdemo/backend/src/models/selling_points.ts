import mongoose from "mongoose";
import type Selling_points_Data from "../types/selling_points_data";

mongoose.set("strictQuery", false);

const sellingPointSchema = new mongoose.Schema<Selling_points_Data>({
    user_id: {
        type: String
    },
    name: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    static_point: {
        type: Boolean,
        default: true
    },
    product_type: {
        type: String,
        default: "Otro",
        validate: {
            validator: (valor: string) => {
                const admitidos = ["Comida","Artesania","Servicios","Ropa"];
                return admitidos.includes(valor);
            }
        }
    }
}, {
    timestamps: true 
});

sellingPointSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const SellingPoint = mongoose.model<Selling_points_Data>("SellingPoint", sellingPointSchema);

export default SellingPoint;
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

// Agregar authSource=admin para la autenticación
const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.MONGODB_DBNAME}?authSource=admin`;

export default { PORT, MONGODB_URI, HOST };

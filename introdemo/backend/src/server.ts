import dotenv from "dotenv";
dotenv.config();
import app from "./index";

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.listen(Number(PORT), HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});


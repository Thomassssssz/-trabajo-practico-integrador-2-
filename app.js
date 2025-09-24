//---Importaciones--------//
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/database.js";
import { routes } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

//-------Middlewares-----------//
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//---------Rutas-----------//
app.use("/api", routes);

//---------Servidor-----------//
app.listen(PORT, async () => {
  await connectDB();
  console.log("Servidor corriendo en la bd en el puerto", PORT);
});

app.use(cors());

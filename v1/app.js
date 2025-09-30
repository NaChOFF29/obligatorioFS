import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import v1Routes from "./index.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { handleSpecificErrors } from "./middlewares/handleSpecificErrors.js";

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montamos todas las rutas de v1
app.use("/v1", v1Routes);
app.get("/", (req, res) => {
  res.json({ 
    message: "API desplegada en Vercel", 
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production"
  });
});

// Middleware 404 - debe ir después de todas las rutas
app.use(notFoundMiddleware);

// Middleware de manejo de errores específicos - antes del errorMiddleware general
app.use(handleSpecificErrors);

// Middleware de manejo de errores general - debe ir al final
app.use(errorMiddleware);


export default app;

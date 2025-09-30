import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import v1Routes from "./index.js";

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

// Middleware 404 (si querés podés armar un notFoundMiddleware.js)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error genérico
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    error: err.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});


export default app;

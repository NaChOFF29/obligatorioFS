import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import v1Routes from "./index.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montamos todas las rutas de v1
app.use("/v1", v1Routes);
app.get("/", (req, res) => {
  res.json({ message: "Deploy a Vercel" });
});
// Middleware 404 (si querés podés armar un notFoundMiddleware.js)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error genérico
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});


export default app;

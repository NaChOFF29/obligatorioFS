import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import v1Routes from "./index.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { handleSpecificErrors } from "./middlewares/handleSpecificErrors.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 2000,                 // máximo 20 requests por IP
  message: "Demasiadas peticiones, intente más tarde.",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: "Too many requests",
      limit: options.max,
      windowMs: options.windowMs,
      retryAfter: Math.ceil(options.windowMs / 1000) + "s"
    });
  }
});
// Aplicar a toda la app
app.use(limiter);

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

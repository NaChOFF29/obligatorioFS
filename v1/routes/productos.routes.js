import express from "express";
import {
  guardarProducto,
  obtenerProductos,
  obtenerTodosLosProductos,
  modificarProducto,
  eliminarProducto
} from "../controllers/productos.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Ruta pública (sin autenticación) - DEBE IR ANTES del middleware authenticate
router.get("/publicos", obtenerTodosLosProductos); // GET /productos/publicos

// Middleware de autenticación para todas las rutas siguientes
router.use(authenticate);

// Rutas protegidas (requieren autenticación)
router.post("/", guardarProducto);       // alta
router.get("/", obtenerProductos);       // consulta del usuario autenticado
router.patch("/:id", modificarProducto);   // modificación
router.delete("/:id", eliminarProducto); // baja

export default router;

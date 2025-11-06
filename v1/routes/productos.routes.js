import express from "express";
import {
  guardarProducto,
  obtenerProductos,
  obtenerTodosLosProductos,
  modificarProducto,
  eliminarProducto,
  obtenerInformeUso
} from "../controllers/productos.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { crearProductoSchema, actualizarProductoSchema, productoIdSchema } from "../validators/productos.validators.js";

const router = express.Router();

// Ruta pública (sin autenticación) - DEBE IR ANTES del middleware authenticate
router.get("/publicos", obtenerTodosLosProductos); // GET /productos/publicos

// Middleware de autenticación para todas las rutas siguientes
router.use(authenticate);

// Rutas protegidas (requieren autenticación)
router.get("/informe-uso", obtenerInformeUso);  // informe de uso por plan
router.post("/", validateBody(crearProductoSchema), guardarProducto);       // alta
router.get("/", obtenerProductos);       // consulta del usuario autenticado
router.patch("/:id", validateBody(actualizarProductoSchema), modificarProducto);   // modificación
router.delete("/:id", validateBody(productoIdSchema), eliminarProducto); // baja

export default router;

import express from "express";
import {
  guardarProducto,
  obtenerProductos,
  modificarProducto,
  eliminarProducto
} from "../controllers/productos.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", guardarProducto);       // alta
router.get("/", obtenerProductos);       // consulta
router.patch("/:id", modificarProducto);   // modificación
router.delete("/:id", eliminarProducto); // baja

export default router;

import express from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorId
} from "../controllers/categorias.controller.js";

const router = express.Router();

// Consulta de categorías (solo lectura)
router.get("/", obtenerCategorias);           // GET /categorias - Obtener todas las categorías
router.get("/:id", obtenerCategoriaPorId);    // GET /categorias/:id - Obtener categoría por ID

export default router;
import express from "express";
import {
  obtenerCategorias
} from "../controllers/categorias.controller.js";

const router = express.Router();

// Consulta de categorías (solo lectura)
router.get("/", obtenerCategorias);           // GET /categorias - Obtener todas las categorías

export default router;
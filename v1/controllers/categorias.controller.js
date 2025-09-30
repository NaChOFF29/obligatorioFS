import {
  
  obtenerCategoriasService,
  obtenerCategoriaPorIdService

} from "../services/categorias.services.js";

// Consulta de todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategoriasService();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consulta de categoría por ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await obtenerCategoriaPorIdService(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

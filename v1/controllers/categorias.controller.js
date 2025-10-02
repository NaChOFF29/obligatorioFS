import {
  
  obtenerCategoriasService

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



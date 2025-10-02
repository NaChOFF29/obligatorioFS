import Categoria from "../models/categoria.model.js";



// ✅ Obtener todas las categorías
export const obtenerCategoriasService = async () => {
  const categorias = await Categoria.find();
  return categorias;
};



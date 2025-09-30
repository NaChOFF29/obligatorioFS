import Categoria from "../models/categoria.model.js";



// ✅ Obtener todas las categorías
export const obtenerCategoriasService = async () => {
  const categorias = await Categoria.find();
  return categorias;
};

// ✅ Obtener categoría por ID
export const obtenerCategoriaPorIdService = async (id) => {
  const categoria = await Categoria.findById(id);
  return categoria;
};


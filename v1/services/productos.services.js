import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js";
import Usuario from "../models/usuario.model.js";

// ✅ Guardar producto
export const guardarProductoService = async (nuevoProducto) => {
  try {
    // Obtener el usuario para verificar su plan
    const usuario = await Usuario.findById(nuevoProducto.usuario).populate('plan');
    if (!usuario) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }

    // Si el usuario es "plus", verificar que no tenga más de 10 productos
    if (usuario.plan && usuario.plan.nombre === "plus") {
      const cantidadProductos = await Producto.countDocuments({ usuario: nuevoProducto.usuario });
      if (cantidadProductos >= 10) {
        const err = new Error("Los usuarios Plus no pueden crear más de 10 productos");
        err.status = 403;
        throw err;
      }
    }

    const producto = new Producto(nuevoProducto);
    await producto.save();
    return producto;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.error('Error en guardarProductoService:', error);
    throw new Error("Error al guardar producto");
  }
};

// ✅ Obtener productos del usuario autenticado
export const obtenerProductosService = async (userId) => {
  try {
    const productos = await Producto.find({ usuario: userId })
      .populate("categoria", "nombre descripcion")
      .populate("usuario", "username");
    return productos;
  } catch (error) {
    console.error('Error en obtenerProductosService:', error);
    throw new Error("Error al obtener productos");
  }
};

// ✅ Obtener todos los productos públicamente (sin autenticación)
export const obtenerTodosLosProductosService = async () => {
  try {
    const productos = await Producto.find()
      .populate("categoria", "nombre")
      .populate("usuario", "nombre")
      .sort({ createdAt: -1 }); // Ordenar por más recientes primero
    return productos;
  } catch (error) {
    console.error('Error en obtenerTodosLosProductosService:', error);
    throw new Error("Error al obtener productos");
  }
};

// ✅ Modificar
export const modificarProductoPorIdService = async (id, datosNuevos, userId) => {
  try {
    // Buscar el producto primero
    const producto = await Producto.findById(id);
    if (!producto) {
      const err = new Error("Producto no encontrado");
      err.status = 404;
      throw err;
    }

    // Verificar que el usuario sea el propietario
    if (producto.usuario.toString() !== userId) {
      const err = new Error("No tienes permisos para modificar este producto");
      err.status = 403;
      throw err;
    }

    // Actualizar el producto
    const productoModificado = await Producto.findByIdAndUpdate(id, datosNuevos, { new: true })
      .populate("categoria", "nombre")
      .populate("usuario", "username nombre");
    return productoModificado;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.error('Error en modificarProductoPorIdService:', error);
    throw new Error("Error al modificar producto");
  }
};

// ✅ Eliminar
export const eliminarProductoService = async (id, userId) => {
  try {
    // Buscar el producto primero
    const producto = await Producto.findById(id);
    if (!producto) {
      const err = new Error("Producto no encontrado");
      err.status = 404;
      throw err;
    }

    // Verificar que el usuario sea el propietario
    if (producto.usuario.toString() !== userId) {
      const err = new Error("No tienes permisos para eliminar este producto");
      err.status = 403;
      throw err;
    }

    // Eliminar el producto
    const productoElim = await Producto.findByIdAndDelete(id);
    return productoElim;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.error('Error en eliminarProductoService:', error);
    throw new Error("Error al eliminar producto");
  }
};

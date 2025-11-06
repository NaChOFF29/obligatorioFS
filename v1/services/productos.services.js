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

// ✅ Obtener productos del usuario autenticado con filtro por fecha
export const obtenerProductosService = async (userId, filtroFecha = null) => {
  try {
    const query = { usuario: userId };
    
    // Aplicar filtro por fecha si existe
    if (filtroFecha) {
      const ahora = new Date();
      
      switch(filtroFecha) {
        case 'semana':
          // Últimos 7 días
          const haceSemana = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
          query.createdAt = { $gte: haceSemana };
          break;
        case 'mes':
          // Último mes (30 días)
          const haceMes = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
          query.createdAt = { $gte: haceMes };
          break;
        case 'historico':
          // Sin filtro de fecha - todos los documentos
          break;
        default:
          // Si el filtro no es válido, ignorar
          break;
      }
    }
    
    const productos = await Producto.find(query)
      .populate("categoria", "nombre descripcion")
      .populate("usuario", "username")
      .sort({ createdAt: -1 }); // Más recientes primero
    return productos;
  } catch (error) {
    console.error('Error en obtenerProductosService:', error);
    throw new Error("Error al obtener productos");
  }
};

// ✅ Obtener todos los productos públicamente con filtro por fecha
export const obtenerTodosLosProductosService = async (filtroFecha = null) => {
  try {
    const query = {};
    
    // Aplicar filtro por fecha si existe
    if (filtroFecha) {
      const ahora = new Date();
      
      switch(filtroFecha) {
        case 'semana':
          const haceSemana = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
          query.createdAt = { $gte: haceSemana };
          break;
        case 'mes':
          const haceMes = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
          query.createdAt = { $gte: haceMes };
          break;
        case 'historico':
          // Sin filtro de fecha
          break;
      }
    }
    
    const productos = await Producto.find(query)
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

// ✅ Informe de uso - Cantidad de productos por plan
export const obtenerInformeUsoService = async () => {
  try {
    // Obtener todos los usuarios con sus planes
    const usuarios = await Usuario.find().populate('plan');
    
    // Contar productos por plan
    const informePorPlan = {};
    let totalProductos = 0;
    
    for (const usuario of usuarios) {
      const planNombre = usuario.plan ? usuario.plan.nombre : 'sin-plan';
      
      // Contar productos de este usuario
      const cantidadProductos = await Producto.countDocuments({ usuario: usuario._id });
      
      if (!informePorPlan[planNombre]) {
        informePorPlan[planNombre] = {
          plan: planNombre,
          cantidadProductos: 0,
          cantidadUsuarios: 0
        };
      }
      
      informePorPlan[planNombre].cantidadProductos += cantidadProductos;
      informePorPlan[planNombre].cantidadUsuarios += 1;
      totalProductos += cantidadProductos;
    }
    
    // Calcular porcentajes
    const informeConPorcentajes = Object.values(informePorPlan).map(item => ({
      ...item,
      porcentajeUso: totalProductos > 0 
        ? ((item.cantidadProductos / totalProductos) * 100).toFixed(2) + '%'
        : '0%'
    }));
    
    return {
      totalProductos,
      totalUsuarios: usuarios.length,
      informePorPlan: informeConPorcentajes
    };
  } catch (error) {
    console.error('Error en obtenerInformeUsoService:', error);
    throw new Error("Error al obtener informe de uso");
  }
};

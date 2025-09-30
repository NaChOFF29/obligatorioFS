import {
  guardarProductoService,
  obtenerProductosService,
  obtenerTodosLosProductosService,
  modificarProductoPorIdService,
  eliminarProductoService
} from "../services/productos.services.js";

// Alta
export const guardarProducto = async (req, res) => {
  try {
    const nuevoProducto = {
      ...req.body,
      usuario: req.userId // viene del token
    };
    const producto = await guardarProductoService(nuevoProducto);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consulta
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await obtenerProductosService(req.userId);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consulta pública - todos los productos
export const obtenerTodosLosProductos = async (req, res) => {
  try {
    const productos = await obtenerTodosLosProductosService();
    res.json({
      message: "Productos públicos",
      total: productos.length,
      productos: productos
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modificación
export const modificarProducto = async (req, res) => {
  try {
    const productoModificado = await modificarProductoPorIdService(req.params.id, req.body, req.userId);
    res.json(productoModificado);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Baja
export const eliminarProducto = async (req, res) => {
  try {
    const productoElim = await eliminarProductoService(req.params.id, req.userId);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

import {
  guardarProductoService,
  obtenerProductosService,
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

// Modificación
export const modificarProducto = async (req, res) => {
  try {
    const productoModificado = await modificarProductoPorIdService(req.params.id, req.body);
    if (!productoModificado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(productoModificado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Baja
export const eliminarProducto = async (req, res) => {
  try {
    const productoElim = await eliminarProductoService(req.params.id);
    if (!productoElim) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

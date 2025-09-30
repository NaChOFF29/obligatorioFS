import express from "express";
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

// Más adelante vas a agregar productosRoutes y usuariosRoutes
// import productosRoutes from "./routes/productos.routes.js";
// import usuariosRoutes from "./routes/usuarios.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "/v1" });
});

// Rutas públicas
router.use("/auth", authRoutes);
router.use("/productos", productosRoutes); // Incluye tanto rutas públicas como protegidas

// Rutas públicas de momento (productos/usuarios después pueden requerir auth)
// router.use("/productos", productosRoutes);
// router.use("/usuarios", usuariosRoutes);

// Middleware de autenticación global (todo lo de abajo requiere token)
router.use(authenticate);

router.use("/categorias", categoriasRoutes);
router.use("/usuarios", usuariosRoutes); // Si querés que algunas rutas de auth requieran token
// Ejemplo: si tuvieras una ruta "snails" protegida
// router.use("/snails", snailsRoutes);

export default router;

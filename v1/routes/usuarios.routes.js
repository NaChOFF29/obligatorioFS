import express from "express";
import { cambioPlan, obtenerInformeUso } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.get("/informe-uso", obtenerInformeUso);
router.patch("/cambio-plan", cambioPlan);

export default router;
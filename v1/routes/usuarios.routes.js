import express from "express";
import { cambioPlan } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.patch("/cambio-plan", cambioPlan);

export default router;
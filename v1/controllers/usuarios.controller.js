import { cambioPlanService, obtenerInformeUsoService } from "../services/usuarios.services.js";

export const cambioPlan = async (req, res) => {
  try {
    const updatedUser = await cambioPlanService(req.userId);
    res.json({
      message: "Plan actualizado correctamente",
      plan: updatedUser.plan
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Informe de uso del usuario
export const obtenerInformeUso = async (req, res) => {
  try {
    const informe = await obtenerInformeUsoService(req.userId);
    res.status(200).json(informe);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


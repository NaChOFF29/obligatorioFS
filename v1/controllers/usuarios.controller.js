import { cambioPlanService } from "../services/usuarios.services.js";

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


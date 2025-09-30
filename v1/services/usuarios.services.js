import Usuario from "../models/usuario.model.js";
import Plan from "../models/plan.model.js";

export const cambioPlanService = async (userId) => {
  // Poblar el plan para poder acceder a sus propiedades
  const usuario = await Usuario.findById(userId).populate('plan');
  console.log("Usuario encontrado:", usuario);
  if (!usuario) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  // Verificar que el usuario tenga plan "plus"
  if (usuario.plan.nombre !== "plus") { 
    const err = new Error("Solo se puede cambiar de plus a premium");
    err.status = 400;
    throw err;
  }

  // Buscar el plan premium en la base de datos
  const planPremium = await Plan.findOne({ nombre: "premium" });
  if (!planPremium) {
    const err = new Error("Plan premium no encontrado");
    err.status = 500;
    throw err;
  }

  // Asignar el ObjectId del plan premium
  usuario.plan = planPremium._id;
  await usuario.save();
  
  // Poblar de nuevo para retornar el usuario con el plan actualizado
  await usuario.populate('plan');
  
  console.log("Usuario actualizado:", usuario); 
  console.log("Nuevo plan del usuario:", usuario.plan.nombre);
  return usuario;
  
};




import Usuario from "../models/usuario.model.js";
import Rol from "../models/rol.model.js";

export const cambioPlanService = async (userId) => {
  // Poblar el rol para poder acceder a sus propiedades
  const usuario = await Usuario.findById(userId).populate('rol');
  console.log("Usuario encontrado:", usuario);
  if (!usuario) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  // Verificar que el usuario tenga rol "plus"
  if (usuario.rol.nombre !== "plus") { 
    const err = new Error("Solo se puede cambiar de plus a premium");
    err.status = 400;
    throw err;
  }

  // Buscar el rol premium en la base de datos
  const rolPremium = await Rol.findOne({ nombre: "premium" });
  if (!rolPremium) {
    const err = new Error("Rol premium no encontrado");
    err.status = 500;
    throw err;
  }

  // Asignar el ObjectId del rol premium
  usuario.rol = rolPremium._id;
  await usuario.save();
  
  // Poblar de nuevo para retornar el usuario con el rol actualizado
  await usuario.populate('rol');
  
  console.log("Usuario actualizado:", usuario); 
  console.log("Nuevo rol del usuario:", usuario.rol.nombre);
  return usuario;
  
};




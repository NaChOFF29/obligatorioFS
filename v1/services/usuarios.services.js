import Usuario from "../models/usuario.model.js";
import Plan from "../models/plan.model.js";
import Producto from "../models/producto.model.js";

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

// ✅ Informe de uso - Información del usuario autenticado
export const obtenerInformeUsoService = async (userId) => {
  try {
    // Obtener el usuario con su plan
    const usuario = await Usuario.findById(userId).populate('plan');
    if (!usuario) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      throw err;
    }

    // Contar productos del usuario
    const cantidadProductos = await Producto.countDocuments({ usuario: userId });
    
    const planNombre = usuario.plan ? usuario.plan.nombre : 'sin-plan';
    
    // Construir respuesta según el tipo de plan
    const informe = {
      usuario: usuario.username,
      plan: planNombre,
      cantidadProductos: cantidadProductos
    };

    // Si es plan PLUS, agregar porcentaje de uso (límite de 10)
    if (planNombre === 'plus') {
      const limiteProductos = 10;
      const porcentajeUso = ((cantidadProductos / limiteProductos) * 100).toFixed(2);
      
      informe.limiteProductos = limiteProductos;
      informe.productosRestantes = Math.max(0, limiteProductos - cantidadProductos);
      informe.porcentajeUso = `${porcentajeUso}%`;
    }
    
    // Si es plan PREMIUM, solo mostrar cantidad (sin límite)
    if (planNombre === 'premium') {
      informe.mensaje = 'Plan premium: productos ilimitados';
    }

    return informe;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    console.error('Error en obtenerInformeUsoService:', error);
    throw new Error("Error al obtener informe de uso");
  }
};




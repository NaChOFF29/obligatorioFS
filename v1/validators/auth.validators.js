import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'El username solo puede contener letras y números',
            'string.min': 'El username debe tener al menos 3 caracteres',
            'string.max': 'El username no puede tener más de 30 caracteres',
            'any.required': 'El username es requerido'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'any.required': 'La contraseña es requerida'
        })
});

export const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'El username solo puede contener letras y números',
            'string.min': 'El username debe tener al menos 3 caracteres',
            'string.max': 'El username no puede tener más de 30 caracteres',
            'any.required': 'El username es requerido'
        }),
    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.pattern.base': 'La contraseña debe contener solo letras y números',
            'any.required': 'La contraseña es requerida'
        }),
    
    confirmPassword: Joi.valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Las contraseñas no coinciden',
            'any.required': 'La confirmación de contraseña es requerida'
        }),

      nombre: Joi.string()
        .min(2)
        .max(100)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .optional()
        .messages({
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede tener más de 100 caracteres',
            'string.pattern.base': 'El nombre solo puede contener letras y espacios'
        })
});
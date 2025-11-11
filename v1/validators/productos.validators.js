import Joi from "joi";

// Validador para crear producto
export const crearProductoSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.min': 'El nombre del producto debe tener al menos 2 caracteres',
            'string.max': 'El nombre del producto no puede tener más de 100 caracteres',
            'any.required': 'El nombre del producto es requerido',
            'string.empty': 'El nombre del producto no puede estar vacío'
        }),
    descripcion: Joi.string()
        .min(10)
        .max(500)
        .trim()
        .required()
        .messages({
            'string.min': 'La descripción debe tener al menos 10 caracteres',
            'string.max': 'La descripción no puede tener más de 500 caracteres',
            'any.required': 'La descripción es requerida',
            'string.empty': 'La descripción no puede estar vacía'
        }),
    precio: Joi.number()
        .positive()
        .precision(2)
        .min(0.01)
        .max(999999.99)
        .required()
        .messages({
            'number.positive': 'El precio debe ser un número positivo',
            'number.min': 'El precio mínimo es 0.01',
            'number.max': 'El precio máximo es 999,999.99',
            'any.required': 'El precio es requerido'
        }),
    imagen: Joi.string()
        .uri()
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'La imagen debe ser una URL válida'
        }),
    categoria: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'La categoría debe ser un ObjectId válido',
            'string.length': 'La categoría debe tener exactamente 24 caracteres',
            'any.required': 'La categoría es requerida'
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .max(99999)
        .optional()
        .default(0)
        .messages({
            'number.integer': 'El stock debe ser un número entero',
            'number.min': 'El stock no puede ser negativo',
            'number.max': 'El stock máximo es 99,999'
        }),
    activo: Joi.boolean()
        .optional()
        .default(true)
        .messages({
            'boolean.base': 'El campo activo debe ser verdadero o falso'
        })
});

// Validador para actualizar producto
export const actualizarProductoSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .optional()
        .messages({
            'string.min': 'El nombre del producto debe tener al menos 2 caracteres',
            'string.max': 'El nombre del producto no puede tener más de 100 caracteres',
            'string.empty': 'El nombre del producto no puede estar vacío'
        }),
    descripcion: Joi.string()
        .min(10)
        .max(500)
        .trim()
        .optional()
        .messages({
            'string.min': 'La descripción debe tener al menos 10 caracteres',
            'string.max': 'La descripción no puede tener más de 500 caracteres',
            'string.empty': 'La descripción no puede estar vacía'
        }),
    precio: Joi.number()
        .positive()
        .precision(2)
        .min(0.01)
        .max(999999.99)
        .optional()
        .messages({
            'number.positive': 'El precio debe ser un número positivo',
            'number.min': 'El precio mínimo es 0.01',
            'number.max': 'El precio máximo es 999,999.99'
        }),
    imagen: Joi.string()
        .uri()
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'La imagen debe ser una URL válida'
        }),
    categoria: Joi.string()
        .hex()
        .length(24)
        .optional()
        .messages({
            'string.hex': 'La categoría debe ser un ObjectId válido',
            'string.length': 'La categoría debe tener exactamente 24 caracteres'
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .max(99999)
        .optional()
        .messages({
            'number.integer': 'El stock debe ser un número entero',
            'number.min': 'El stock no puede ser negativo',
            'number.max': 'El stock máximo es 99,999'
        }),
    
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

// Validador para parámetros de ID
export const productoIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            'any.required': 'El ID del producto es requerido'
        })
});


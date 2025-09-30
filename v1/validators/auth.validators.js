import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required()
    
});

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    rol: Joi.string(),
    nombre: Joi.string()
});
import Joi from 'joi';

export const createUserSchema = Joi.object({
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  correo_electronico: Joi.string().email().required(),
  contrasena: Joi.string().required().min(6)
});

export const loginSchema = Joi.object({
  correo_electronico: Joi.string().required(),
  contrasena: Joi.string().required()
});
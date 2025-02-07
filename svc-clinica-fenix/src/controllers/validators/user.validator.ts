import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
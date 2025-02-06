import Joi from 'joi';

export const createPatientSchema = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    cui: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    income_at: Joi.date().required(),
});

export const updatePatientSchema = Joi.object({
    id_patient: Joi.number().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    cui: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    income_at: Joi.date().required(),
});
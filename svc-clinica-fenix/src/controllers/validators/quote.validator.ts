import Joi from 'joi';

export const createQuoteSchema = Joi.object({
    id_patient: Joi.number().required(),
    date: Joi.date().required(),
    hour: Joi.number().required(),
    description: Joi.string().required()
});

export const updateQuoteSchema = Joi.object({
    id_patient: Joi.number().required(),
    date: Joi.date().required(),
    hour: Joi.number().required(),
    id_citas:Joi.number().required(),
    description: Joi.string().required()
});
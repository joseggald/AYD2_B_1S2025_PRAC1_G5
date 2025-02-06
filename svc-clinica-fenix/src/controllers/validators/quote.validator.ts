import Joi from 'joi';

export const createQuoteSchema = Joi.object({
    id_record: Joi.number().required(),
    date: Joi.date().required(),
    hour: Joi.number().required(),

});

export const updateQuoteSchema = Joi.object({
    id_record: Joi.number().required(),
    date: Joi.date().required(),
    hour: Joi.number().required(),
});
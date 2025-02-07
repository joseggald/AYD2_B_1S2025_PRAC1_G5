import Joi from 'joi';

export const createRecipeSchema = Joi.object({
    id_record: Joi.number().required(),
    medicine: Joi.string().required(),
    dose: Joi.number().required(),
    id_unit_dose: Joi.number().required(),
    frecuency: Joi.number().required(),
    id_unit_frecuency: Joi.number().required(),
    indications: Joi.string().required(),
    doctor_signature: Joi.string().required()

});

export const updateRecipeSchema = Joi.object({
    id_record: Joi.number().required(),
    medicine: Joi.string().required(),
    dose: Joi.number().required(),
    id_unit_dose: Joi.number().required(),
    frecuency: Joi.number().required(),
    id_unit_frecuency: Joi.number().required(),
    indications: Joi.string().required(),
    doctor_signature: Joi.string().required()
});
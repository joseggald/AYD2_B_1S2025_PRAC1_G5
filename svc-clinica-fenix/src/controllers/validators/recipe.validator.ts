import Joi from 'joi';

export const createRecipeSchema = Joi.object({
    id_patient: Joi.number().required(),
    medicine: Joi.string().required(),
    dose: Joi.number().required(),
    frequency: Joi.string().required(),
    indications: Joi.string().required(),
    doctor_signature: Joi.string().required()

});

export const updateRecipeSchema = Joi.object({
    id_patient: Joi.number().required(),
    medicine: Joi.string().required(),
    dose: Joi.number().required(),
    frequency: Joi.string().required(),
    indications: Joi.string().required(),
    doctor_signature: Joi.string().required(),
    id_recipe: Joi.number().required()
});
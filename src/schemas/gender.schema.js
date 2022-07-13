const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string();
const serieId = Joi.number().integer();

export const createGenderSchema = Joi.object({
    image: image.required(),
    name: name.required(),
    
});

export const updateGenderSchema = Joi.object({
    image,
    name,
    
});

export const getGenderSchema = Joi.object({
    id: id.required(),  
});
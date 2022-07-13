const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer();
const image = Joi.string().uri();
const title = Joi.string()
const order = Joi.string().valid('ASC','DESC')
const creation_date = Joi.date().format('YYYY-MM-DD');
const characterId = Joi.number().integer();
const serieId = Joi.number().integer();
const genderId = Joi.number().integer();
const qualification = Joi.number().integer().min(1).max(5);

export const createSerieSchema = Joi.object({
    image: image.required(),
    title: title.required(),
    creation_date: creation_date.required(),
    qualification: qualification.required(),
    genderId: genderId.required()
});

export const updateSerieSchema = Joi.object({
    image,
    title,
    creation_date,
    qualification,
    genderId  
});

export const getSerieSchema = Joi.object({
    id: id.required(),   
})

export const addCharacterSchema = Joi.object({
    serieId: serieId.required(),
    characterId: characterId.required(),
  })
  export const querySerieSchema = Joi.object({
    title,
    genderId,
    order
  });
//export default { getCharacterSchema, updateCharacterSchema, getCharacterSchema };

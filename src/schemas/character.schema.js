const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string()
const edad = Joi.number().integer().min(1);
const peso = Joi.number().integer().min(1);
const historia = Joi.string()
const serieId = Joi.number().integer();
const title = Joi.string()
const creation_date = Joi.date().format('YYYY-MM-DD');

//limit && offset
const limit = Joi.number().integer();
const offset = Joi.number().integer();
// range
const edad_min = Joi.number().integer();
const edad_max = Joi.number().integer();

const peso_min = Joi.number().integer();
const peso_max = Joi.number().integer();

export const createCharacterSchema = Joi.object({
    image: image.required(),
    name: name.required(),
    edad: edad.required(),
    peso: peso.required(),
    historia: historia.required(),
    //serie: Joi.object({
       // image: image.required(),
        //title: title.required(),
       // creation_date: creation_date.required(),
       // })
    serieId: serieId.required()
});

export const updateCharacterSchema = Joi.object({
    image,
    name,
    edad,
    peso,
    historia,
    serieId
});

export const getCharacterSchema = Joi.object({
    id: id.required(),

    //peliculaId: categoryId.required()
})
export const queryCharacterSchema = Joi.object({
    limit,
    serieId,
    name,
    offset,
    edad,
    peso,
    edad_min,
    edad_max: edad_max.when('edad_min', {
      is: Joi.number().integer().required(),
      then: Joi.required()
    }),
    peso_min,
    peso_max: peso_max.when('peso_min', {
      is: Joi.number().integer().required(),
      then: Joi.required()
    })
  });
//export default { getCharacterSchema, updateCharacterSchema, getCharacterSchema };

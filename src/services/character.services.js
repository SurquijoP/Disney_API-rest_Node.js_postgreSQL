
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { query } = require('express');

export class CharacterService {
  constructor() {}

  async create(data) {
    const newcharacter = await models.Character.create(data);
    return newcharacter;
  }

  async find(query) {
    const options = {where:{}, 
      attributes: ['image', 'name']
    }
    
    //paginacion con query limit&&offset and other paramethers
    const { limit, offset } = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const {name} = query;
    if (name){
      options.where.name = name;
    }
    const {serieId} = query;
    if (serieId){
      options.where.serieId = serieId;
    }
    const { edad } = query;
    if (edad) {
    options.where.edad = edad;
    }
    const { edad_min, edad_max } = query;
    if (edad_min && edad_max) {
      options.where.edad = {
        [Op.gte]: edad_min,
        [Op.lte]: edad_max,
      };
    }
    const { peso } = query;
    if (peso) {
    options.where.peso = peso;
    }
    const { peso_min, peso_max } = query;
    if (peso_min && peso_max) {
      options.where.peso = {
        [Op.gte]: peso_min,
        [Op.lte]: peso_max,
      };
    }
    const rta = await models.Character.findAll(options);
    return rta;
    }

  async findOne(id) {
    const character = await models.Character.findByPk(id, {include: ['serie']});
    if(!character) {
    throw boom.notFound("Character not found");
    }
    return character;
  }

  async update(id, changes) {
    const character = await this.findOne(id);
    const rta = character.update(changes);
    return rta;
  }

  async delete(id) {
    const character = await this.findOne(id);
    await character.destroy()
    return { id }
}
}
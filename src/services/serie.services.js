const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

export class SerieService {
  constructor() {}

  async create(data) {
    const newSerie = await models.Serie.create(data);
    return newSerie;
  }

  async find(query) {
    const options = {where:{},
    attributes: ['title', 'image', 'creation_date']}//paginacion con query limit&&offset and other paramethers
    const {title} = query;
    if (title){
      options.where.title = title;
    }
    const {genderId} = query;
    if (genderId){
      options.where.genderId = genderId;
    }
    const {order} = query;
    if(order) {
      options.order = order === 'DESC'? [['creation_date', 'DESC']]:[['creation_date']]
    }
    
    const rta = await models.Serie.findAll( options, {include: ['character']});
    return rta;
  }
  async addItem(data){
    const newCharacter = await models.SerieCharacter.create(data);
    return newCharacter;
   }

  async findOne(id) {
    const serie = await models.Serie.findByPk(id, {include: ['gender','character']});
    if(!serie) {
    throw boom.notFound("Serie not found");
    }
    return serie;
  }

  async update(id, changes) {
    const serie = await this.findOne(id);
    const rta = serie.update(changes);
    return rta;
  }

  async delete(id) {
    const serie = await this.findOne(id);
    await serie.destroy()
    return { id }
}
}
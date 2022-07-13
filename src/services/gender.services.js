const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

export class Genderservice {
  constructor() {}

  async create(data) {
    const newGender = await models.Gender.create(data);
    return newGender;
  }

  async find() {
    const rta = await models.Gender.findAll();
    return rta;
  }
 
  async findOne(id) {
    const gender = await models.Gender.findByPk(id); //{include: ['serie']}
    if(!gender) {
    throw boom.notFound("Gender not found");
    }
    return gender;
  }

  async update(id, changes) {
    const gender = await this.findOne(id);
    const rta = gender.update(changes);
    return rta;
  }

  async delete(id) {
    const gender = await this.findOne(id);
    await gender.destroy()
    return { id }
}
}
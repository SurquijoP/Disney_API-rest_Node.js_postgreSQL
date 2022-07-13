const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer();
const username = Joi.string(); //update
const password = Joi.string(); //update
const role = Joi.string();
const email = Joi.string();



export const userCreateSchema = Joi.object({
  //  username: username.required(),
    password: password.required(),
    role: role,
    email:email.required()
});
export const userRegisterSchema = Joi.object({
  //  username: username.required(),
    password: password.required(),
    email:email.required()
});

export const updateUserSchema = Joi.object({
   // username,
    password,
    role,
    email
});   

export const getUserSchema = Joi.object({
    id: id.required()
})
import {UserService} from './user.services';
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
import { config } from '../config.js/config';
import nodemailer from 'nodemailer';
import  boom  from '@hapi/boom';
const service = new UserService();

export class AuthService {
    async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user){
       throw (boom.unauthorized())
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw (boom.unauthorized());
    }
    delete user.dataValues.password;
    return user;
 }
 signToken(user){
    const payload = {
        sub: user.id,
        role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
        user,
        token
    };
 }
 async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
       throw boom.unauthorized()
    }
    const payload = { sub : user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken: token})
    const mail = {
         from: config.smtp_email, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Email para recuperar contraseña", // Subject line
            html: `<b>Ingresa a este link => ${link}</b>`, // html body
       }
       const rta = await this.sendMail(mail);
       return rta;
   }
 async sendMailWelcome(email){
    const user = await service.findByEmail(email);
    if(!user){
       throw boom.unauthorized()
    }
    const mail = {
        from: config.smtp_email, // sender address
           to: `${user.email}`, // list of receivers
           subject: "Bienvenido a la coleccion de caracteres de Disney", // Subject line
           html: `<b>Puedes explorar el mundo de Disney, podras conocer  los
           personajes que lo componen y entender en qué series en la que estos participaron. </b>`, // html body
      }
      const rta = await this.sendMail(mail);
      return rta;

   }
 async sendMail(infoMail){
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true, // true for 465, false for other ports
        port: 465,
        auth: {
            user: config.smtp_email,
            pass: config.smtp_password
        }
      });
      await transporter.sendMail(infoMail); 
      return {message: "mail sent"}
 }
}
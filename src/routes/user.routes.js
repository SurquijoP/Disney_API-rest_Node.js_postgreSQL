import { Router } from "express";
const router = Router();
import {AuthService} from '../services/auth.services'
import * as userServ from '../services/user.services'
const serviceAuth = new AuthService
const service = new userServ.UserService
import * as userSche from '../schemas/user.schema'
const validatorHandler = require('../middlewares/validator.handler')


router.get('/',
 async (req, res, next) => {
  try {
    const character = await service.find(req.query);
    res.json(character);
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validatorHandler(userSche.getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  )


router.post('/',
  validatorHandler(userSche.userCreateSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/auth/register',
  validatorHandler(userSche.userRegisterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const {email} = req.body;
      const newUser = await service.create(body);
      const rta = await serviceAuth.sendMailWelcome(email);
      res.status(201).json(newUser);
      return rta;
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(userSche.getUserSchema, 'params'),
  validatorHandler(userSche.updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(userSche.getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id, message: 'User was deleted'});
    } catch (error) {
      next(error);
    }
  }
);


export default router;

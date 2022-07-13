import { Router } from "express";
const router = Router();
import * as charactServ from '../services/character.services'
const service = new charactServ.CharacterService
import * as charactSche from '../schemas/character.schema'
const validatorHandler = require('../middlewares/validator.handler')
import passport from "passport";
import { checkRoles } from '../middlewares/auth.handler'



router.get('/'
,passport.authenticate('jwt', {session: false}),
checkRoles('admin','moderator','user'),
 validatorHandler(charactSche.queryCharacterSchema, 'query')
,
async (req, res, next) => {
  try {
    const character = await service.find(req.query);
    res.json(character);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',passport.authenticate('jwt', {session: false}),
checkRoles('admin','moderator'),
  validatorHandler(charactSche.getCharacterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await service.findOne(id);
      res.json(character);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',passport.authenticate('jwt', {session: false}),
checkRoles('admin','moderator'),
  validatorHandler(charactSche.createCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCharacter = await service.create(body);
      res.status(201).json(newCharacter);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',passport.authenticate('jwt', {session: false}),
  checkRoles('admin','moderator',),
  validatorHandler(charactSche.getCharacterSchema, 'params'),
  validatorHandler(charactSche.updateCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const character = await service.update(id, body);
      res.json(character);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','moderator'),
  validatorHandler(charactSche.getCharacterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id, message: 'Character was deleted'});
    } catch (error) {
      next(error);
    }
  }
);


export default router;
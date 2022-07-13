import { response, Router } from "express";
const router = Router();
import * as serieServ from '../services/serie.services'
const service = new serieServ.SerieService
import * as serieSche from '../schemas/series.schema'
const validatorHandler = require('../middlewares/validator.handler')
import passport from "passport";
import { checkAdminRole, checkRoles } from '../middlewares/auth.handler'

router.get('/',passport.authenticate('jwt', {session: false}),
 checkRoles('admin','moderator','user'),
 validatorHandler(serieSche.querySerieSchema, 'query')
,
async (req, res, next) => {
  try {
    const serie = await service.find(req.query);//req.query
    res.json(serie);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',passport.authenticate('jwt', {session: false}),
checkRoles('admin', 'moderator'),
  validatorHandler(serieSche.getSerieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const serie = await service.findOne(id);
      res.json(serie);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'moderator'),
  validatorHandler(serieSche.createSerieSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSerie = await service.create(body);
      res.status(201).json(newSerie);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/add-character',
  validatorHandler(serieSche.addCharacterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'moderator'),
  validatorHandler(serieSche.getSerieSchema, 'params'),
  validatorHandler(serieSche.updateSerieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const serie = await service.update(id, body);
      res.status(203).json(serie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(serieSche.getSerieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id, message: 'Serie was deleted'});
    } catch (error) {
      next(error);
    }
  }
);


export default router;
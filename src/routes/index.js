import express from "express";
import characterRouter from '../routes/character.route'
import seriesRouter from '../routes/series.route'
import genderRouter from '../routes/gender.route'
import userRouter from '../routes/user.routes'
import authRouther from '../routes/auth.route'

export function routerApi(app) {
    const router = express.Router();
  app.use('/API/v1', router);
  router.use('/character', characterRouter);
  router.use('/series',seriesRouter);
  router.use('/gender',genderRouter);
  router.use('/users',userRouter);
  router.use('/auth', authRouther);
};
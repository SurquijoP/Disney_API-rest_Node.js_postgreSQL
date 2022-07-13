import { Router } from "express";
const router = Router();
import passport from "passport";
import jwt from 'jsonwebtoken';
import {config} from '../config.js/config';
import {AuthService} from '../services/auth.services';

const service = new AuthService;

router.post('/login',
 passport.authenticate('local', {session: false}),
 async (req, res, next) => {
    try {
        const user = req.user;
        res.json(service.signToken(user))
        }
     catch(error){
        next(error);
   }
  }
);

router.post('/recovery',
 async (req, res, next) => {
    try {
        const {email} = req.body
        const rta = await service.sendRecovery(email);
        res.json(rta);
    } catch(error){
        next(error);
   }
 }
);

export default router;
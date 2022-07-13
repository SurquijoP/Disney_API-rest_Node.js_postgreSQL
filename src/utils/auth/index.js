import passport from 'passport'
import {localStrategy} from './stategies/local.strategy'
import {jwtStrategy} from './stategies/jwt.strategy'

passport.use(localStrategy);
passport.use(jwtStrategy);

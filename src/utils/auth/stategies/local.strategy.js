import { Strategy } from "passport-local";
import { AuthService } from "../../../services/auth.services";
const service =  new AuthService
export const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) =>{
try {
    const user = await service.getUser(email, password);  
    done(null, user);
} catch(error) {
  done(error, false);
}
});


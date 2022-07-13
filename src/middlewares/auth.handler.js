import  boom  from "@hapi/boom";


export function checkAdminRole(req, res, next) {
 const user = req.user;
 if (user.role === 'admin') {
    next()
 } else {
    next(boom.unauthorized());
 }
}

export function checkRoles(...roles) {
    return (req, res, next) =>{
    const user = req.user;
    if (roles.includes(user.role)) {
       next()
    } else {
       next(boom.unauthorized());
    }
   }
}
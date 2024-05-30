import authService from '../service/auth.js';

async function restrictToLoggedInUserOnly(req, res, next) {
    console.log(req)
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/login");
    const user = authService.getUser(userUid)
    console.log(req.user)
    console.log(user)

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}
async function checkAuth(req, res, next) {
  
    const userUid = req.cookies?.uid;

    const user = authService.getUser(userUid)

    req.user = user;
    next();
}

export default {
    restrictToLoggedInUserOnly,
    checkAuth
}
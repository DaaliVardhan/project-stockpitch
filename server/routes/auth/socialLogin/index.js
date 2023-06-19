const Router = require("express").Router();
const googleRouter = require("./google");
const facebookRouter = require("./facebook");

// URL : /auth/facebook
// Method : GET
// Desc : Redirects to facebook login page
Router.use('/google',googleRouter);
Router.use('/facebook',facebookRouter)



module.exports = Router;
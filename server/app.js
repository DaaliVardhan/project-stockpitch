const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

// Routers
const authRouter = require("./routes/auth")

// app
const app = express();


// middlewares
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use("/api/auth",authRouter);
app.use("/google",googleRouter);
app.route("*")
    .get((req,res)=>res.status(404).json({"success":false,"error":"Invalid URL"}))
    .post((req,res)=>res.status(404).json({"success":false,"error":"Invalid URL"}))
    .put((req,res)=>res.status(404).json({"success":false,"error":"Invalid URL"}))
    .delete((req,res)=>res.status(404).json({"success":false,"error":"Invalid URL"}))
    .patch((req,res)=>res.status(404).json({"success":false,"error":"Invalid URL"}))



passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})


    module.exports = app;

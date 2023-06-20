const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Routers
const authRouter = require("./routes/auth")
const socialLoginRouter = require("./routes/auth/socialLogin")
const expenseRouter = require("./routes/expenseApi")

// app
const app = express();


// middlewares
app.use(cors({
    origin:[process.env.REACT_CLIENT_URL,process.env.SERVER_URL,'*'],
    credentials:true,
}))

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
app.use("/auth",socialLoginRouter);
app.use("/api/auth",authRouter);
app.use('/api/expense',expenseRouter);


app.use((req,res)=>{
    return res.status(404).json({"success":false,"error":"Invalid URL"});
})

app.use((err,req,res,next)=>{
    console.log(err);
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(500).json({"success":false,"error":errorMessage});
})
passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})


module.exports = app;

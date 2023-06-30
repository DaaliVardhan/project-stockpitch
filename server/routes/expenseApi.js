const Router = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { verifyToken } = require('../middlewares/auth');
const { postExpense, getExpense, getDayExpense, getWeekExpense, getMonthExpense,getYearExpense, getTotalExpense, getTotalYearlyExpense,getTotalMonthlyExpense } = require('../controllers/expenseController');



async function getUserName(req,res,next){
    const userId = req.query?.userId ||"6488809ebbeaba9e7c7c1a58";
    try {
        const user = await User.findOne({_id:userId}).select('-password');
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}



async function isVerifed(req,res,next){
    const user = req.user;
    if(!user.isEmailVerified){
        return res.status(403).json({success:'false',message:'Email is not verified'})
    }
    next();
}

Router.use(getUserName);
Router.use(isVerifed);
// Router.use(verifyToken)

// URL : /api/expense
// Method : POST
// Description : Add or Update expense
// Request Body : { date?,income?,shoppingExpense?,payments?,foodExpense?,others? }
// If date is not provided then it will take current date
Router.post('/',asyncHandler(postExpense))

// URL : /api/expense
// Method : GET
// Description : Get all expense
// Query Params : startDate?,endDate?
// Request Body : None
Router.get('/' ,asyncHandler(getExpense))

// URL : /api/expense/day
// Method : GET
// Description : Get expense of the day
// Request Body : None
Router.get('/day' ,asyncHandler(getDayExpense))
// URL : /api/expense/week
// Method : GET
// Description : Get expense of the week
// Request Body : None
Router.get('/week' ,asyncHandler(getWeekExpense))

// URL : /api/expense/month
// Method : GET
// Description : Get expense of the month
// Request Body : None
Router.get('/month' ,asyncHandler(getMonthExpense))

// URL : /api/expense/year
// Method : GET
// Description : Get expense of the year
// Request Body : None
Router.get('/year' ,asyncHandler(getYearExpense))

// URL : /api/expense/total
// Method : GET
// Description : Get total expense
// Query Params : startDate?,endDate?
// Request Body : None
Router.get('/total',asyncHandler(getTotalExpense))

// URL : /api/expense/yearly
// Method : GET
// Description : Get total yearly expense
// Query Params : startDate?,endDate?
// Request Body : None
Router.get('/yearly',asyncHandler(getTotalYearlyExpense))


// URL : /api/expense/monthly
// Method : GET
// Description : Get total monthly expense
// Query Params : startDate?,endDate?
// Request Body : None
Router.get('/monthly',asyncHandler(getTotalMonthlyExpense))



module.exports = Router;
const Expense = require('../../models/Expense');
const moment = require('moment');


const postExpense = async(req,res,next)=>{
    const userId = req.user._id;
    const { date,income,shoppingExpense,payments,foodExpense,others } = req.body;
    
    try{
        if(date){
            const startDate = moment(date).startOf('day').toString();
            const endDate = moment(date).endOf('day').toString();
            const expense = await Expense.findOneAndUpdate({userId,date:{ $gte: startDate, $lt: endDate }},{userId,date,income,shoppingExpense,payments,foodExpense,others},{upsert:true,new:true});
            return res.status(200).json({"success":true,userId,expense});
        }
        const expense = await Expense.findOneAndUpdate({userId},{userId,income,shoppingExpense,payments,foodExpense,others},{upsert:true,new:true});
        return res.status(200).json({"success":true,userId,expense});
    }catch(error){
        console.log(error);
        next(error);
    }
}

const getExpense = async(req,res,next)=>{
    const userId = req.user._id;
    try {
        if(Object.keys(req.query).length<=1){
            const expense = await Expense.find({userId}).sort({date:1});
            return res.status(200).json({"success":true,userId,expense});
        }
        if(req.query.startDate && req.query.endDate){
            let { startDate,endDate } = req.query;
            startDate = moment(startDate).startOf('day').toString();
            endDate = moment(endDate).endOf('day').toString();
            const expense = await Expense.find({userId,date:{$gte:startDate,$lte:endDate}}).sort({date:1});
            return res.status(200).json({"success":true,userId,expense});
        }
        if(req.query.startDate){
            let { startDate } = req.query;
            startDate = moment(startDate).startOf('day').toString();
            const expense = await Expense.find({userId,date:{$gte:startDate}}).sort({date:1});
            return res.status(200).json({"success":true,userId,expense});
        }
        if(req.query.endDate){
            let { endDate } = req.query;
            endDate = moment(endDate).endOf('day').toString();
            const expense = await Expense.find({userId,date:{$lte:endDate}}).sort({date:1});
            return res.status(200).json({"success":true,userId,expense});
        }
        else{
            return res.status(404).json({"success":false,userId,expense:[]})
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const getDayExpense = async(req,res,next)=>{
    try{
        const userId = req.user._id;
        const date = moment();
        const startDate = moment(date).startOf('day').toString();
        const endDate = moment(date).endOf('day').toString()
        const expense = await Expense.findOne({userId,date:{ $gte: startDate, $lt: endDate }});
        return res.status(200).json({"success":true,userId,expense});
    }catch(error){
        console.log(error);
        next(error);  
    }
}



const getWeekExpense = async(req,res,next)=>{
    try {
        const userId = req.user._id;
        const startDate = moment().startOf('week').toString();
        const endDate = moment().endOf('week').toString();
        const expense = await Expense.find({userId,date:{$gte:startDate,$lte:endDate}});
        return res.status(200).json({"success":true,userId,expense})
    } catch (error) {
        console.log(error);
        next(error)

    }
}

const getMonthExpense = async(req,res,next)=>{
    try {
        const userId = req.user._id;
        const startDate = moment().startOf('month').toString();
        const endDate = moment().endOf('month').toString();
        const expense = await Expense.find({userId,date:{$gte:startDate,$lte:endDate}});
        return res.status(200).json({"success":true,userId,expense});
    } catch (error) {
        console.log(error);
        next(error);

    }
}

const getYearExpense = async(req,res,next)=>{
    try {
        const userId = req.user._id;
        const startDate = moment().startOf('year').toString();
        const endDate = moment().endOf('year').toString();
        const expense = await Expense.find({userId,date:{$gte:startDate,$lte:endDate}});
        return res.status(200).json({"success":true,userId,expense});
    } catch (error) {
        console.log(error);
        next(error);

    }
}

const getTotalExpense = async(req,res,next)=>{
    const userId = req.user._id;
    try {
        if(Object.keys(req.query).length===0){
            const expense = await Expense.getExpense({userId});
            return res.status(200).json({"success":true,userId,expense});
        }
        if(req.query.startDate && req.query.endDate){
            let { startDate,endDate } = req.query;
            startDate = moment(startDate).startOf('day').toString();
            endDate = moment(endDate).endOf('day').toString();
            const expense = await Expense.getExpense({userId,startDate,endDate});
            return res.status(200).json({"success":true,userId,expense});    
        }
        if(req.query.startDate){
            let startDate = req.query.startDate;
            startDate = moment(startDate).startOf('day').toString();
            const expense = await Expense.getExpense({userId,startDate});
            return res.status(200).json({"success":true,userId,expense})
        }
        if(req.query.endDate){
            let endDate = req.query.endDate;
            endDate = moment(endDate).endOf('day').toString();
            const expense = await Expense.getExpense({userId,startDate:null,endDate});
            return res.status(200).json({"success":true,userId,expense});
        }
        return res.status(202).json({success:true,userId,expense:[]})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getTotalYearlyExpense = async(req,res,next)=>{
    const userId = req.user._id;
    let { year } = req.query;
    try {
        if(!year){
            year = moment().startOf('year');
        }
        const expenses = [];
        for(let i=0;i<12;i++){
            const startDate = moment(year).startOf('month').toString();
            const endDate = moment(year).endOf('month').toString();
            const expense = await Expense.getExpense({userId,startDate,endDate});
            expenses.push({expense});
            year = moment(year).add(1,'month');
        }
        return res.status(200).json({"success":true,userId,expenses});
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const getTotalMonthlyExpense = async(req,res,next)=>{
    const userId = req.user._id;
    let { month,year } = req.query;
    try {
        if(!month || !year){
            month = moment().month();
            year = moment().year();
        }
        const days = moment().month(month).year(year).daysInMonth();
        let date = moment().month(month).year(year).startOf('month').toString();
        
        const expenses = [];
        for(let i=1;i<=days;i++){
            const startDate = moment(new Date(date.toString())).startOf('day').toString();
            const endDate = moment(new Date(date.toString())).endOf('day').toString();
            const expense = await Expense.getExpense({userId,startDate,endDate});
            expenses.push({[moment().month(month).year(year).date(i).format('DD-MM-YYYY')]:expense});
            date = moment(new Date(date.toString())).add(1,'day');
        }
        return res.status(200).json({"success":true,userId,expenses});
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    postExpense,
    getExpense,
    getDayExpense,
    getWeekExpense,
    getMonthExpense,
    getYearExpense,
    getTotalExpense,
    getTotalYearlyExpense,
    getTotalMonthlyExpense
}
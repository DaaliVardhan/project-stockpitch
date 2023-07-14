const router = require('express').Router();
const User = require('../models/User');
const {
    getSavings,addSavings,deleteSavings,
    getStocks,addStocks,deleteStocks,
    getBondTypes,getBonds,addBonds,deleteBonds,
    getGold, addGold,deleteGold,
    getPpf, addPpf,deletePpf,
    getCommodity, addCommodity,deleteCommodity,
    getMutualFunds, addMutualFunds,deleteMutualFund,
    getCustomTracker,addCustomTracker,deleteCustomTracker
} = require('../controllers/InvestmentTracker')


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
    try {
        const user = req.user;
    if(!user.isEmailVerified){
        res.status(403);
        throw new Error("Email is not verified");
    }
    next();
    } catch (error) {
        next(error)
    }
}

router.use(getUserName);
router.use(isVerifed);

// URL : /api/tracker/savings
// Method : GET
// Description : Get savings

router.get('/savings',getSavings)

// URL : /api/tracker/savings
// Method : POST
// Description : Add savings
// Body : { addSavings : 1000, removeSavings : 1000 (optional), clearSavings : true (optional)}

router.post('/savings',addSavings)



// URL : /api/tracker/savings
// Method : DELETE
// Description : Delete savings

router.delete('/savings',deleteSavings)


// URL : /api/tracker/stocks
// Method : GET
// Description : Get stocks

router.get('/stocks',getStocks)

// URL : /api/tracker/stocks
// Method : POST
// Description : Add stocks

router.post('/stocks',addStocks)


// URL : /api/tracker/stocks
// Method : DELETE
// Description : Delete stocks
router.delete('/stocks',deleteStocks)

// URL : /api/tracker/bond-types
// Method : GET
// Description : Get bond types
router.get('/bond-types',getBondTypes)

// URL : /api/tracker/bonds
// Method : GET
// Description : Get bonds

router.get('/bonds',getBonds)

// URL : /api/tracker/bonds
// Method : POST
// Description : Add/Update bonds

router.post('/bonds',addBonds)

// URL : /api/tracker/bonds
// Method : DELETE
// Description : Delete bonds

router.delete('/bonds',deleteBonds)

// URL : /api/tracker/gold
// Method : GET
// Description : Get gold

router.get('/gold',getGold)

// URL : /api/tracker/gold
// Method : POST
// Description : Add / Update gold

router.post('/gold',addGold)

// URL : /api/tracker/gold
// Method : DELETE
// Description : Delete gold

router.delete('/gold',deleteGold)


// URL : /api/tracker/ppf
// Method : GET
// Description : Get ppf

router.get('/ppf',getPpf)

// URL : /api/tracker/ppf
// Method : POST
// Description : Add / Update ppf

router.post('/ppf',addPpf)

// URL : /api/tracker/ppf
// Method : DELETE
// Description : Delete ppf
router.delete('/ppf',deletePpf)

// URL : /api/tracker/commodity
// Method : GET
// Description : Get commodity

router.get('/commodity',getCommodity)


// URL : /api/tracker/commodity
// Method : POST
// Description : Add / Update commodity

router.post('/commodity',addCommodity)

// URL : /api/tracker/commodity
// Method : DELETE
// Description : Delete commodity

router.delete('/commodity',deleteCommodity)



// URL : /api/tracker/mutual-funds
// Method : GET
// Description : Get mutual funds

router.get('/mutual-funds',getMutualFunds)

// URL : /api/tracker/mutual-funds
// Method : POST
// Description : Add / Update mutual funds

router.post('/mutual-funds',addMutualFunds)

// URL : /api/tracker/mutual-funds
// Method : DELETE
// Description : Delete mutual funds

router.delete('/mutual-funds',deleteMutualFund)


// URL : /api/tracker/custom-tracker
// Method : GET
// Description : Get custom tracker

router.get('/custom-tracker',getCustomTracker)

// URL : /api/tracker/custom-tracker
// Method : POST
// Description : Add / Update custom tracker

router.post('/custom-tracker',addCustomTracker)

// URL : /api/tracker/custom-tracker
// Method : DELETE
// Description : Delete custom tracker

router.delete('/custom-tracker',deleteCustomTracker)

module.exports = router;
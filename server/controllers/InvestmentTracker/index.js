
const { getSavings, addSavings,deleteSavings }= require("./saving");
const {getStocks, addStocks, deleteStocks} = require('./stock');
const {getBondTypes, getBonds, addBonds,deleteBonds} = require('./bond');
const {getGold, addGold,deleteGold} = require('./gold');
const {getPpf, addPpf,deletePpf} = require('./ppf');
const {getCommodity, addCommodity,deleteCommodity} = require('./commodity');
const {getMutualFunds, addMutualFunds,}= require('./mutual');
const {getCustomTracker, addCustomTracker,} = require('./custom');

module.exports = {
    getSavings,
    addSavings,
    deleteSavings,
    getStocks,
    addStocks,
    deleteStocks,
    getBondTypes,
    getBonds,
    addBonds,
    deleteBonds,
    getGold,
    addGold,
    deleteGold,
    getPpf,
    addPpf,
    deletePpf,
    getCommodity,
    addCommodity,
    deleteCommodity,
    getMutualFunds,
    addMutualFunds,
    getCustomTracker,
    addCustomTracker,
}
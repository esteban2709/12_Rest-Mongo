const mongoose = require('mongoose');
const configDB = require('../config/config');

let dataBase = mongoose.createConnection(configDB.dataBase.person, {
});


module.exports = { dataBase }
const mongoose = require('mongoose');
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

module.exports = mongoose;
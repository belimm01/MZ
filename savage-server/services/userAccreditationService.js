const uuid = require("uuid/v4");
const userAccreditation = require("../models/userAccreditation");
const DB_URL = 'mongodb://admin:adminadmin1@ds149676.mlab.com:49676/mz';
const mongoose = require('../config/mongodb/mongoConfig');

process.env.MONGODB = DB_URL;
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

module.exports = {
    findUserByCorrelationIdAndUpdate: function (correlationId, body) {
        return userAccreditation.findOneAndUpdate({"correlationId": correlationId}, body);
    },
    findUserByCorrelationId: function (correlationId) {
        return userAccreditation.findOne({"correlationId": correlationId}).then(function (userAccreditation) {
            console.log(userAccreditation)
            return userAccreditation;
        })
            .catch(function (err) {
                console.log(err);
            });
    },
    deleteUserByCorrelationId: function (correlationId, body) {
        return userAccreditation.findOneAndDelete(correlationId, body)
    },
    createNewUser: function (req) {
        req.correlationId = uuid(); //set correlationId for which userAccreditation form
        const newUserAccreditation = new userAccreditation(req);
        return newUserAccreditation.save().then(function(userAccreditation) {
            return userAccreditation;
        })
            .catch(function(err) {
                console.log(err);
            });;
    },
    getAllUsers: function () {
        return userAccreditation.find({});
    }
};
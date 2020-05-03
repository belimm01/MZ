const uuid = require("uuid/v4");
const userAccreditation = require("../models/userAccreditation");

module.exports = {
    findUserByCorrelationIdAndUpdate: function (correlationId, body) {
        return userAccreditation.findOneAndUpdate({"correlationId": correlationId}, body);
    },
    findUserByCorrelationId: function (correlationId, token) {
        return userAccreditation.findOne({
            "correlationId": correlationId,
            "info.token": token
        }).then(function (userAccreditation) {
            return userAccreditation;
        })
            .catch(function (err) {
                console.log(err);
            });
    },
    deleteUserByCorrelationId: function (correlationId, body) {
        return userAccreditation.findOneAndDelete({"correlationId": correlationId}, body)
    },
    createNewUser: function (req) {
        req.correlationId = uuid(); //set correlationId for which userAccreditation form
        const newUserAccreditation = new userAccreditation(req);
        return newUserAccreditation.save().then(function (userAccreditation) {
            return userAccreditation;
        })
            .catch(function (err) {
                console.log(err);
            });
    },
    getAllUsers: function () {
        return userAccreditation.find({});
    }
};
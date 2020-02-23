const uuid = require("uuid/v4");
const userAccreditation = require("../models/userAccreditation");

module.exports = {
    findUserByCorrelationIdAndUpdate: function (correlationId, body) {
        return userAccreditation.findOneAndUpdate({"correlationId": correlationId}, body);
    },
    deleteUserByCorrelationId: function (correlationId, body) {
        return userAccreditation.findOneAndDelete(correlationId, body)
    },
    createNewUser: function (req) {
        req.correlationId = uuid(); //set correlationId for which userAccreditation form
        const newUserAccreditation = new userAccreditation(req.body[0]);
        newUserAccreditation.save(err => {
            if (err) return res.status(500).send(err);
        });
    },
    getAllUsers: function () {
        return userAccreditation.find({});
    }
};
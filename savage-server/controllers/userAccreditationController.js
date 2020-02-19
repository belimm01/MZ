let appRouter = (app) => {
    const uuid = require("uuid/v4")
    const userAccreditation = require("../models/userAccreditation");
    const DB_URL = 'mongodb://admin:adminadmin1@ds149676.mlab.com:49676/mz';
    const mongoose = require('../config/mongodb/MongoConfig');

    process.env.MONGODB = DB_URL;
    mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
    mongoose.connection.on('error', function () {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    });

    //receive accreditation object from ....
    app.post('/userAccreditation', (req, res) => {
        let result = req.body[0];
        result.correlationId = uuid(); //set correlationId for which userAccreditation form
        const newUserAccreditation = new userAccreditation(result);
        newUserAccreditation.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(newUserAccreditation);
        });
    });

    //
    // app.get('/userAccreditation/:token/:email', (req, res) => {
    //     userAccreditation.find({"info.token": req.params.token, "info.email": req.params.email})
    //         .then((doc) => {
    //             console.log(doc);
    //             return res.status(200).send(doc);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // });

    //find user by name
    app.get('/userAccreditation/name/:name', (req, res) => {
        userAccreditation.find({"info.name": req.params.name})
            .then((doc) => {
                console.log(doc);
                return res.status(200).send(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    //get all users
    app.get('/userAccreditation/id/:correlationId', (req, res) => {
        userAccreditation.find({"correlationId": req.params.correlationId})
            .then((doc) => {
                console.log(doc);
                return res.status(200).send(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    //get all users
    app.get('/userAccreditationList', (req, res) => {
        userAccreditation.find({})
            .then((doc) => {
                console.log(doc);
                return res.status(200).send(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

module.exports = appRouter;
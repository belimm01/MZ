let appRouter = (app) => {

    const Accreditation = require("../models/Accreditation");
    const DB_URL = 'mongodb://admin:adminadmin1@ds149676.mlab.com:49676/mz';
    const mongoose = require('../mongodb/MongoConfig');

    process.env.MONGODB = DB_URL;
    mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
    mongoose.connection.on('error', function () {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    });

    app.post('/accreditation', (req, res) => {
        let result = req.body[0];
        const newAccreditation = new Accreditation(result);
        newAccreditation.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(newAccreditation);
        });
    });

    app.get('/accreditation', (req, res) => {
        console.log(req.query.email);
        Accreditation.findOne({"info.email": req.query.email})
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
let appRouter = (app) => {
    const DB_URL = 'mongodb://admin:adminadmin1@ds149676.mlab.com:49676/mz';
    const mongoose = require('../config/mongodb/mongoConfig');
    const userAccreditationService = require( "../services/userAccreditationService");

    process.env.MONGODB = DB_URL;
    mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
    mongoose.connection.on('error', function () {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    });

    //receive accreditation object from MZ....
    app.post('/userAccreditation', async (req, res) => {
        await userAccreditationService.createNewUser(req);
        res.status(200);
    });

    //update user by id
    app.put('/userAccreditation/id/:correlationId', async (req, res) => {
        const body = req.body;
        const correlationId = req.params.correlationId;
        const result = await userAccreditationService.findUserByCorrelationIdAndUpdate(correlationId, body);
        res.status(200).send(result);
    });

    //delete user by id
    app.delete('/userAccreditation/id/:correlationId', async (req, res) => {
        const body = req.body;
        const correlationId = req.params.correlationId;
        const result = await userAccreditationService.deleteUserByCorrelationId(correlationId, body);
        res.status(200).send(result);
    });

    //get all users
    app.get('/userAccreditationList', async (req, res) => {
        const result = await userAccreditationService.getAllUsers();
        res.status(200).send(result);
    });
};

module.exports = appRouter;
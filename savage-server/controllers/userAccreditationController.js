let appRouter = (app) => {
    const userAccreditationService = require("../services/userAccreditationService");

    //receive accreditation object from MZ....
    app.post('/userAccreditation', async (req, res) => {
        const result = await userAccreditationService.createNewUser(req.body[0]);
        res.status(200).send(result);
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
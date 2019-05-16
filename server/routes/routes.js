let appRouter =  (app) => {
    let jsonData;

    app.get("/api/v1.0/owncloud/", (req, res) => {
        res.status(200).send(jsonData);
    });

    app.post('/api/v1.0/owncloud/', (req, res) => {
        res.send('POST request to the homepage');
        console.log(req.body);
        jsonData = req.body;
    })
};

module.exports = appRouter;
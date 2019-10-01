const mongoose = require('../mongodb/MongoConfig');
mongoose.set('debug', true);

const accreditationSchema = mongoose.Schema({
    info: {
        requestId: String,
        fee: String,
        email: String,
        redirect: String,
        folderName: String,
        token: String
    },
    form: []
});
module.exports = mongoose.model('Accreditation', accreditationSchema);
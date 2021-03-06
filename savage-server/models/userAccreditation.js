const mongoose = require('../config/mongodb/mongoConfig');
mongoose.set('debug', true);

const userAccreditationSchema = mongoose.Schema({
    correlationId: String,
    info: [],
    form: [],
    state: {},
    upload: {}
});

let UserAccreditation = mongoose.model('Accreditation', userAccreditationSchema);

module.exports = UserAccreditation;
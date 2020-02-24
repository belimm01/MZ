import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

export default {
    getUserInfoByCorrelationIdAndToken(correlationId, token) {
        return axios.get('/userAccreditation/' + correlationId + '/' + token);
    },
    updateUserAccreditationState(correlationId, userAccreditation) {
        return axios.put('/userAccreditation/' + correlationId, userAccreditation);
    },
};
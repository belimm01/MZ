import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export default {
    getUserInfo(userCorrelationId) {
        return axios.get('/userAccreditation/id/' + userCorrelationId);
    },

    getAllUsers() {
        return axios.get("/userAccreditationList");
    },
};
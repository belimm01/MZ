import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export default {
    getUserInfo(userCorrelationId) {
        return axios.get('/userAccreditation/id/' + userCorrelationId);
    },

    updateUserInfo(currentUser) {
        return axios.put('/userAccreditation/id/' + currentUser.correlationId, currentUser);
    },

    deleteUser(userCorrelationId) {
        return axios.delete('/userAccreditation/id/' + userCorrelationId);
    },

    getAllUsers() {
        return axios.get("/userAccreditationList");
    },
};
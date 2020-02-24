function checkUrl(self, url) {
    const token = url.searchParams.get("token");
    const correlationId = url.searchParams.get("correlationId");
    console.log("Token", token);
    console.log("correlationId", correlationId);

    if (isUrlParameterExist(correlationId, token)) {
        if (checkUrlParameterLength(correlationId, token)) {
            self.$store.commit("changeToken", token);
            self.$store.commit("changeCorrelationId", correlationId);
            return true;
        } else {
            console.log("incorrect Token or CorrelationId, please provide url with example:http://localhost:3030/accreditation/?correlationId=value&token=value");
            return false;
        }
    } else {
        console.log("incorrect url, please provide url with example: http://localhost:3030/accreditation/?correlationId=value&token=value");
        return false;
    }
}

function isUrlParameterExist(correlationId, token) {
    return ((token !== "undefined" && correlationId !== "undefined") && (token !== null && correlationId !== null));
}

function checkUrlParameterLength(correlationId, token) {
    return (token.length > 0 && correlationId.length > 0);
}

export {checkUrl};
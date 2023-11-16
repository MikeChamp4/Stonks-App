const axios = require("axios");
const fs = require("fs");
const urls = require("../data/urls.json");

// API Props //
const hostApi = "www.bolsasymercados.es";

const apiConnectionGeneralPropsCtrl = {
    axios: axios,
    fs: fs,
    urls: urls,
    hostApi: hostApi,
};

module.exports = apiConnectionGeneralPropsCtrl;
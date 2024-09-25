const axios = require("axios");

const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl, // Perbaiki di sini
    timeout: parseInt(TIMEOUT),
  });
};

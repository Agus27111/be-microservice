const express = require("express");
const router = express.Router();

const refreshTokensHandler = require("./handler/refresh-token");

router.post("/", refreshTokensHandler.refreshTokens);

module.exports = router;

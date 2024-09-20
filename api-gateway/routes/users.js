const express = require('express');
const router = express.Router();
const {API_USER} = process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(API_USER);
});

module.exports = router;

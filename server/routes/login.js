const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const loginActions = require("../../database/login");


router.post("/", function (req, res, next) {
    loginActions.validateLogIn(req.body, res) ;
  });

  module.exports = router;

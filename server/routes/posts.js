const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const postActions = require("../../database/PostsAction");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "sql_proj",
});

con.connect(function (err) {
  if (err) throw err;
/////OPENS CONNECTION/////////////

  router.get("/", function (req, res, next) {
    Object.keys(req.query).length === 0 ? console.log('yes') : console.log('nop');
    // postActions.getPosts(con, req.query);
    res.json("ohaddd");
  });

///// CLOSES CONNECTION/////////////
});
/* GET users listing. */

module.exports = router;

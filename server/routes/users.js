var express = require('express');
var mysql = require('mysql');
const { request } = require('../app');
var router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "sql_proj"
});

con.connect(function (err) {
  if (err) throw err;
  router.get('/', function (req, res) {
    let sql
    if (req.query === {}) {
      sql = 'SELECT * FROM users where '
    }
    else {
      sql = `SELECT * FROM users WHERE 1=1 AND `
      for (let key in req.query) {
        if (key === "email" || key === "username" || key === "name" || key === "id") {
          sql += `${key}='${req.query[key]}' AND `
        }
      }
      sql = sql.slice(0, sql.length - 5);
      
    }
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })
})

module.exports = router;


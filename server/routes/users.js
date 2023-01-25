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
      sql = 'SELECT * FROM users'
    }
    else {
      sql=`SELECT * FROM users WHERE `
      for(let key in req.query) {
        sql+=`IF(EXISTS(SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_NAME = 'users' AND COLUMN_NAME = '${key}'), ${key}='${req.query[key]}',1=1) AND `
      }
      sql=sql.slice(0,sql.length-5);
      console.log(sql);
    }
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })
})

module.exports = router;


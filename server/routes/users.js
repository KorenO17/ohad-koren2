const e = require('express');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var userFunc = require('/home/hilma/Desktop/projects/database/ohad&koren (copy)/database/functions/userFuncs.js')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "sql_proj"
});

con.connect(function (err) {
  if (err) throw err;

  router.get('/', function (req, res) {
    let sql = userFunc.getFunc(req)
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  router.post('/', function (req, res) {
    let sql = userFunc.postFunc(req)
    if (sql) {
      con.query(sql, function (err, result) {
        if (err) console.log("mail/username already exists");
      })
    }

    con.query('SELECT * FROM users', function (err, result) {
      if (err) throw err;
      res.json(result);
    })

  })

router.delete('/', function (req, res) {
  let sql = userFunc.deleteFunc(req)
  if(sql){
    con.query(sql, function (err, result) {
      if (err) console.log(err);
    })
  }

  con.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

})

module.exports = router;


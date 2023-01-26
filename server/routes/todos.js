const e = require('express');
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var todoFunc = require('../../database/functions/todoFuncs')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "sql_proj"
});

con.connect(function (err) {
  if (err) throw err;

  router.get('/', function (req, res) {
    let sql = todoFunc.getFunc(req)
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  router.post('/', function (req, res) {
    let sql = todoFunc.postFunc(req)
    if (sql) {
      con.query(sql, function (err, result) {
        if (err) console.log("one of the details is wrong");
      })
    }

    con.query('SELECT * FROM todos', function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })


router.delete('/', function (req, res) {
  let sql = todoFunc.deleteFunc(req)

  if(sql){
    con.query(sql, function (err, result) {
      if (err) console.log(err);
    })
  }

  con.query('SELECT * FROM todos', function (err, result) {
    if (err) throw err;
    res.json(result);
  })

})

router.put('/', function (req, res){
    let sql = todoFunc.putFunc(req)
    console.log("sql ",sql);
  if(sql){
    con.query(sql, function (err, result) {
      if (err) console.log(err);
    })
  }

  con.query('SELECT * FROM todos', function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

})

module.exports = router;


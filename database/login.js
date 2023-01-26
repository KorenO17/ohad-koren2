const mysql = require("mysql");

let con = mysql.createConnection({
  host: 3306,
  user: "root",
  password: "z10mz10m",
  database: "sql_proj",
});

const loginActions = {
  validateLogIn: (reqBody, callback) => {
    let firstSql = `select * from users username where username='${reqBody.username}';`;
    con.query(firstSql, function (err, result) {
        if(JSON.stringify(result) === "[]"){
            return callback('nope');
        }
      let id = result[0].id;
      if (err) throw err;
      let secondSql = `select * from users JOIN passwords ON users.id = passwords.userId where id = ${id} and password = '${reqBody.password}';`;
      con.query(secondSql, function (err, res) {
        if (err) throw err;
        if (JSON.stringify(res) === "[]") {
          return callback("nope");
        } else {
          console.log("res[0].id: ", res[0].id);
          callback(`${res[0]}`);
        }
        // console.log('second result:' ,res[0].id);
      });
    });
  },
};
// select users.username, passwords.password from users JOIN passwords ON users.id = passwords.userId where username = 'jsmith' and password = 'password1';
module.exports = loginActions;

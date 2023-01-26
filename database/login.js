const mysql = require("mysql");

let con = mysql.createConnection({
  host: 3306,
  user: "root",
  password: "z10mz10m",
  database: "sql_proj",
});

const loginActions = {
  validateLogIn: (reqBody, callback) => {
    console.log('at login actions');
    let firstSql = `select * from users JOIN passwords ON users.id = passwords.userId where users.username='${reqBody.username}' and passwords.password = '${reqBody.password}';`;
    con.query(firstSql, function (err, result) {
      console.log('query :', result[0]);
      if (err) throw err;
      result.length >= 1 ? callback.json(JSON.stringify(result[0])) : callback.json(JSON.stringify({}))
    });
  }
};
// select users.username, passwords.password from users JOIN passwords ON users.id = passwords.userId where username = 'jsmith' and password = 'password1';
module.exports = loginActions;

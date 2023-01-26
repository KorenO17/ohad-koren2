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
    let firstSql = `select * from users username where username='${reqBody.username}';` ;
    con.query(firstSql, function (err, result) {
        console.log('query :', result);
        let id = result[0].id
        if (err) throw err;
        let secondSql = `select users.username, passwords.password from users JOIN passwords ON users.id = passwords.userId where id = ${id} and password = '${reqBody.password}';`
        console.log('secondSql: ', secondSql);
        con.query(secondSql, function (err, result) {
            console.log('length of second :', result.length);
            if (err) throw err;
          })
          console.log('result.id: ', result[0].id);
          result.length >= 1 ? callback(`${result[0].id}`) : callback({})
        
      });
  },
};
// select users.username, passwords.password from users JOIN passwords ON users.id = passwords.userId where username = 'jsmith' and password = 'password1';
module.exports = loginActions;

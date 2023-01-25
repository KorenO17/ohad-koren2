const mysql = require("mysql");

const postActions = {
  getPosts: (con, query) => {
    console.log('hello');
    let sql;
    if (query == {}) {
      sql = "SELECT * FROM posts";
    }
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        console.log('abc');
    });
  },
};

module.exports = postActions;

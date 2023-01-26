const mysql = require("mysql");

let con = mysql.createConnection({
  host: 3306,
  user: "root",
  password: "z10mz10m",
  database: "sql_proj",
});

const postActions = {
  getPosts: (callback, myQuery) => {
    let sql;
    if (myQuery) {
      sql = `SELECT * FROM posts WHERE `;
      for (let key in myQuery) {
        console.log(key);
        if (key === "title" || key === "userId") {
          key === "title"
            ? (sql += `${key}='${myQuery[key]}' AND `)
            : (sql += `${key}=${myQuery[key]} AND `);
        }
      }
      sql = sql.substring(0, sql.length - 4);
    } else {
      sql = "SELECT * FROM posts";
    }
    con.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  },
  postPosts: (reqBody, callback) => {
    if (
      reqBody.title !== '' &&
      reqBody.userId !== '' &&
      reqBody.body !== ''
    ) {
      let sql = `INSERT INTO posts (title, userId, body) VALUES ('${reqBody.title}', ${reqBody.userId}, '${reqBody.body}')`;
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(JSON.stringify({ status: "success" }));
      });
    } else {
      console.log("helopjhgft");
      return callback({ kelevYam: "kelevYam" });
    }
  },
  putPosts: (reqBody, callback) => {
    let sql = `UPDATE posts SET ${reqBody.toChange} = '${reqBody.newValue}' WHERE id = ${reqBody.id};`;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  },
  deletePost: (id, callback) => {
    let sql = `DELETE FROM posts WHERE id= ${id};`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });
  },
};

module.exports = postActions;

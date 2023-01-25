const userFuncs = {
    getFunc: (req) => {
        let sql
        if (req.query === {}) {
            sql = 'SELECT * FROM users where '
        }
        else {
            sql = `SELECT * FROM users WHERE 1=1 AND `
            for (let key in req.query) {
                if (!req.query[key].includes("'") && req.query[key].length > 0) {

                    if (key === "email" || key === "username" || key === "name" || key === "id") {
                        sql += `${key}='${req.query[key]}' AND `
                    }
                }
            }
            sql = sql.slice(0, sql.length - 5);
        }
        return sql;
    },
    postFunc: (req) => {
        let sql
        let email
        let username
        let name
        for (let key in req.body) {
            if (!req.body[key].includes("'") && req.body[key].length > 0) {
                if (key === "email") {
                    email = req.body[key]
                }
                else if (key === "username") {
                    username = req.body[key]
                }
                else if (key === "name") {
                    name = req.body[key]
                }
            }
        }
        if (username && email && name) {
            sql = `INSERT INTO users (name, username, email)
            VALUES ("${name}","${username}","${email}")`
        }
        return sql
    },
    deleteFunc: (req) => {
        let sql
        let id
        for (let key in req.body) {
            if (req.body[key] > 0) {
                if (key === "id") {
                    id = req.body[key]
                }
            }
        }
        if (id) {
            sql = `DELETE FROM users WHERE id=${id};`
        }
        return sql
    }
}

module.exports = userFuncs;
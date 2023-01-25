const todoFuncs = {

    getFunc: (req) => {
        let sql
        if (req.query === {}) {
            sql = 'SELECT * FROM comments where '
        }
        else {
            sql = `SELECT * FROM comments WHERE 1=1 AND `
            for (let key in req.query) {
                if (!req.query[key].includes("'") && req.query[key].length > 0) {
                    if (key === "name" || key === "postId" || key === "email" || key === "body" || key === "id") {
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
        let name
        let postId
        let email
        let body
        for (let key in req.body) {
            if (typeof req.body[key] == 'string' && !req.body[key].includes("'") && req.body[key].length > 0) {
                console.log("hi");
                if (key === "name") {
                    name = req.body[key]
                }
                else if (key === "email") {
                    email = req.body[key]
                }
                else if (key === "body") {
                    body = req.body[key]
                }
            }
            else if (key === "postId") {
                postId = req.body[key]
            }
        }
        if (name && postId && email && body) {
            sql = `INSERT INTO comments (email, name, postId,body)
            VALUES ('${email}',"${name}",${postId},'${body}')`
        }
       
        return sql
    }
    ,
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
            sql = `DELETE FROM comments WHERE id=${id};`
        }
        return sql
    },
    putFunc: (req) => {
        let sql
        let id
        let name
        let postId
        let email
        let body
        for (let key in req.body) {
            if (typeof req.body[key] == 'string' && !req.body[key].includes("'") && req.body[key].length > 0) {
                if (key === "name") {
                    name = req.body[key]
                }
                else if (key === "email") {
                    email = req.body[key]
                }
                else if (key === "body") {
                    body = req.body[key]
                }
            }
            else if (key === "postId") {
                postId = req.body[key]
            }
            else if (key === "id") {
                id = req.body[key]
            }
        }
       
        if (name && postId && email && body && id) {
            sql = `UPDATE comments SET postId=${postId},email='${email}',name='${name}',body='${body}' WHERE id=${id};`
        }
        return sql
    }
}

module.exports = todoFuncs;
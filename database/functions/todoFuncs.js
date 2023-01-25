const todoFuncs = {
    //     "column-name": "title",
    //     "type": "VARCHAR(255)"
    // },
    // {
    //     "column-name": "userId",
    //     "type": "INT"
    // },
    // {
    //     "column-name": "completed",
    //     "type": "BOOLEAN"
    // }
    getFunc: (req) => {
        let sql
        if (req.query === {}) {
            sql = 'SELECT * FROM todos where '
        }
        else {
            sql = `SELECT * FROM todos WHERE 1=1 AND `
            for (let key in req.query) {
                if (!req.query[key].includes("'") && req.query[key].length > 0) {
                    if (key === "title" || key === "userId") {
                        sql += `${key}='${req.query[key]}' AND `
                    }
                }
                else if (key === "completed") {
                    sql += `${key} AND `
                }
            }
            sql = sql.slice(0, sql.length - 5);
        }
        console.log(sql);
        return sql;
    },
    postFunc: (req) => {
        let sql
        let title
        let userId
        let completed
        for (let key in req.body) {
            if (typeof req.body[key] == 'string' && !req.body[key].includes("'") && req.body[key].length > 0) {
                if (key === "title") {
                    title = req.body[key]
                }
            }
            else if (key === "userId") {
                userId = req.body[key]
            }
            else if (key === "completed") {
                completed=req.body[key]
            }
        }
        if (title && userId&&(completed===0||completed===1)) {
            sql = `INSERT INTO todos (completed, title, userId)
            VALUES (${completed},"${title}",${userId})`
        }
        console.log(sql);
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
            sql = `DELETE FROM todos WHERE id=${id};`
        }
        return sql
    },
    putFunc: (req) => {
        let sql
        let id
        let title
        let userId
        let completed
        for (let key in req.body) {
            if (typeof req.body[key] == 'string' && !req.body[key].includes("'") && req.body[key].length > 0) {
                if (key === "title") {
                    title = req.body[key]
                }
            }
            else if (key === "userId") {
                userId = req.body[key]
            }
            else if (key === "completed") {
                completed=req.body[key]
            }
            else if (key === "id") {
                id=req.body[key]
            }
        }
        console.log(id);
        console.log(userId);
        console.log(title);
        console.log(completed);
        if (title && userId&&(completed===0||completed===1)&&id){
            sql=`UPDATE todos SET userId=${userId},completed=${completed},title='${title}' WHERE id=${id};`
        }
        return sql
    }
}

module.exports = todoFuncs;
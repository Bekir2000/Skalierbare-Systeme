const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

let db = new sqlite3.Database('./todos.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
});

if (!fs.existsSync('./todos.db')) {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY, description TEXT, deadline TEXT, percentage INTEGER)')
            //insert default values
            .run(`INSERT INTO todos(description, deadline, percentage)
				VALUES('Beispielseite mit dem Bootstrap Framework anlegen','03/05/2023', 20),
					('Irgendwas machen', '04/03/2022', 50)`)
    });
}

function getTodos(callback) {
    const query = 'SELECT * FROM todos';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.log(err, undefined);
            callback(err);
        } else {
            callback(null, rows);

        }
    });
}
function getTodoId(id, callback) {
    const query = `SELECT * FROM todos WHERE id = ${id};`
    db.all(query, [], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);

        }
    });
}

function addTodo(description, deadline, percentage, callback) {
    db.run(`INSERT INTO todos(description, deadline, percentage) VALUES(?,?,?)`, [`${description}`, `${deadline}`, `${percentage}`], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, this.lastID) //TODO: return row and not just id
        }
    });
}

function editTodo(description, deadline, percentage, id, callback) {
    let data = [`${description}`, `${deadline}`, `${percentage}`, `${id}`];
    let sql = `UPDATE todos
            SET description = ?, deadline = ?, percentage = ?
            WHERE id = ?`;

    db.run(sql, data, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, id)
        }

    });
}

function deleteTodo(id, callback) {
    let data = [`${id}`]
    let sql = 'DELETE FROM todos WHERE id = ?';
    db.run(sql, data, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, id)
        }

    });

}

module.exports = { getTodos, getTodoId, addTodo, editTodo, deleteTodo };

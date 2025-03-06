const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const bcrypt = require('bcrypt');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./todos.db', (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
                reject(err);
                return;
            }
            console.log('Connected to SQLite database.');
            
            db.serialize(() => {
                db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE)', (err) => {
                    if (err) {
                        console.error('Error creating users table:', err.message);
                        reject(err);
                        return;
                    }
                    console.log('Users table ready.');
                })
                .run('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY, description TEXT, deadline TEXT, percentage INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))', (err) => {
                    if (err) {
                        console.error('Error creating todos table:', err.message);
                        reject(err);
                        return;
                    }
                    console.log('Todos table ready.');
                    resolve(db);
                });
            });
        });
    });
}

let db = null;

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database('./todos.db', (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
                reject(err);
                return;
            }
            console.log('Connected to SQLite database.');
            
            db.serialize(() => {
                db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE)', (err) => {
                    if (err) {
                        console.error('Error creating users table:', err.message);
                        reject(err);
                        return;
                    }
                    console.log('Users table ready.');
                })
                .run('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY, description TEXT, deadline TEXT, percentage INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))', (err) => {
                    if (err) {
                        console.error('Error creating todos table:', err.message);
                        reject(err);
                        return;
                    }
                    console.log('Todos table ready.');
                    resolve();
                });
            });
        });
    });
}

function createUser(username, password, email, callback) {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            callback(err);
            return;
        }
        db.run('INSERT INTO users(username, password, email) VALUES(?, ?, ?)', [username, hash, email], function(err) {
            if (err) {
                callback(err);
            } else {
                const userId = this.lastID;
                // Create example todos for the new user
                const exampleTodos = [
                    ['Welcome to MyToDo! Click edit to modify this task', '01/01/2024', 0],
                    ['This is a task in progress', '01/02/2024', 50],
                    ['This is a completed task', '01/03/2024', 100]
                ];
                
                let completed = 0;
                exampleTodos.forEach(todo => {
                    db.run('INSERT INTO todos(description, deadline, percentage, user_id) VALUES(?, ?, ?, ?)',
                        [...todo, userId], (err) => {
                            if (err) {
                                console.error('Error creating example todo:', err);
                            }
                            completed++;
                            if (completed === exampleTodos.length) {
                                callback(null, userId);
                            }
                        });
                });
            }
        });
    });
}

function authenticateUser(username, password, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            callback(err);
        } else if (!user) {
            callback(new Error('User not found'));
        } else {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    callback(err);
                } else if (!match) {
                    callback(new Error('Invalid password'));
                } else {
                    callback(null, user);
                }
            });
        }
    });
}

function getTodos(userId, callback) {
    const query = 'SELECT * FROM todos WHERE user_id = ?';
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.log(err, undefined);
            callback(err);
        } else {
            callback(null, rows);
        }
    });
}

function getTodoId(id, userId, callback) {
    const query = 'SELECT * FROM todos WHERE id = ? AND user_id = ?';
    db.all(query, [id, userId], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
}

function addTodo(description, deadline, percentage, userId, callback) {
    db.run('INSERT INTO todos(description, deadline, percentage, user_id) VALUES(?, ?, ?, ?)', 
        [description, deadline, percentage, userId], 
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.lastID);
            }
    });
}

function editTodo(description, deadline, percentage, id, userId, callback) {
    let sql = 'UPDATE todos SET description = ?, deadline = ?, percentage = ? WHERE id = ? AND user_id = ?';
    db.run(sql, [description, deadline, percentage, id, userId], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, this.changes > 0 ? id : null);
        }
    });
}

function deleteTodo(id, userId, callback) {
    let sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
    db.run(sql, [id, userId], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, this.changes > 0 ? id : null);
        }
    });
}

module.exports = { initializeDatabase, getTodos, getTodoId, addTodo, editTodo, deleteTodo, createUser, authenticateUser };

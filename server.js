const db = require('./db.js');
const express = require('express');

const app = express();
const PORT = 8004;

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/todos', (req, res) => {
    db.getTodos((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.getTodoId(id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

app.post('/api/newtodo', (req, res) => {
    const { description, deadline, percentage } = req.body
    db.addTodo(description, deadline, percentage, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
})

app.put('/api/edittodo/:id', (req, res) => {
    const { id } = req.params;
    const { description, deadline, percentage } = req.body
    db.editTodo(description, deadline, percentage, id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row)
        }
    });
})

app.delete('/api/deletetodo/:id', (req, res) => {
    const { id } = req.params;
    db.deleteTodo(id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
})
app.listen(PORT, ()=> console.log(`listen on http://localhost:${PORT}`))

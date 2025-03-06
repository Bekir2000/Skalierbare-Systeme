const express = require('express');
const session = require('express-session');
const db = require('./db.js');

const app = express();
const PORT = 8004;

// Initialize database before starting the server
db.initializeDatabase()
    .then(() => {
        console.log('Database initialized successfully');
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });

app.use(express.static('./public'));
app.use(express.static('./src'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Auth routes
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    db.createUser(username, password, email, (err, userId) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            req.session.userId = userId;
            res.json({ userId });
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.authenticateUser(username, password, (err, user) => {
        if (err) {
            res.status(401).json({ error: err.message });
        } else {
            req.session.userId = user.id;
            res.json({ userId: user.id });
        }
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// Protected todo routes
app.get('/api/todos', requireAuth, (req, res) => {
    db.getTodos(req.session.userId, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/todos/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    db.getTodoId(id, req.session.userId, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

app.post('/api/newtodo', requireAuth, (req, res) => {
    const { description, deadline, percentage } = req.body;
    db.addTodo(description, deadline, percentage, req.session.userId, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

app.put('/api/edittodo/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    const { description, deadline, percentage } = req.body;
    db.editTodo(description, deadline, percentage, id, req.session.userId, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

app.delete('/api/deletetodo/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    db.deleteTodo(id, req.session.userId, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

app.listen(PORT, () => console.log(`listen on http://localhost:${PORT}`));

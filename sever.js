const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const db = new sqlite3.Database('./database/users.db');

app.use(bodyParser.json());
app.use(express.static('public'));

// Створити таблицю, якщо не існує
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT
)`);

// Реєстрація з bcrypt
app.post('/api/signup', async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            `INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)`,
            [username, email, phone, hashedPassword],
            function (err) {
                if (err) {
                    console.error('DB error:', err);
                    return res.status(400).json({ error: 'User already exists or DB error.' });
                }
                res.json({ success: true });
            }
        );
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Вхід (логін)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, user) => {
            if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ error: 'Invalid credentials' });
            res.json({ success: true, username: user.username });
        }
    );
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const db = new sqlite3.Database('./database/users.db');

const SECRET_KEY = 'your_secret_key';

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

            // Генерація JWT токена
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

            res.json({ 
                success: true, 
                message: `Welcome back, ${user.username}!`, 
                token 
            });
        }
    );
});

// Middleware для перевірки токена
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user; // Зберігаємо дані користувача в запиті
        next();
    });
}

// Захищений маршрут
app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({ success: true, user: req.user });
});

const animal = new sqlite3.Database('./database/animals.db');

app.get('/api/animals', (req, res) => {
    animal.all(`SELECT * FROM animals`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Додаємо повний URL до зображення
        const animalsWithImages = rows.map(animal => ({
            ...animal,
            image_url: `${req.protocol}://${req.get('host')}/images/${path.basename(animal.image_path)}`
        }));

        res.json(animalsWithImages);
    });
});
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
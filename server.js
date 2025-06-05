require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const app = express();
const db = new sqlite3.Database('./database/users.db');
const animals = new sqlite3.Database('./database/animals.db');

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.static('public'));

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT
)`);

animals.run(`CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    reason TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    breed TEXT NOT NULL,
    sterilization TEXT NOT NULL,
    vaccination TEXT NOT NULL,
    microchip TEXT NOT NULL,
    vet_passport TEXT NOT NULL,
    image_path TEXT NOT NULL,
    description TEXT NOT NULL
)`);

app.post('/api/signup', async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            `INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)`,
            [username, email, phone, hashedPassword],
            function (err) {
                if (err) return res.status(400).json({ error: 'User already exists or DB error.' });
                res.json({ success: true });
            }
        );
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, user) => {
            if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, token });
        }
    );
});

app.get('/api/profile', (req, res) => {
    res.json({ success: true, message: 'Profile endpoint' });
});

app.get('/api/animals', (req, res) => {
    animals.all(`SELECT * FROM animals`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const animalsWithImages = rows.map(animal => ({
            ...animal,
            image_url: `${req.protocol}://${req.get('host')}/images/${path.basename(animal.image_path)}`
        }));

        res.json(animalsWithImages);
    });
});

app.post('/api/animals', upload.single('image_path'), (req, res) => {
    const { name, type, location, reason, age, gender, breed, sterilization, vaccination, microchip, vet_passport, description} = req.body;
    const image_path = req.file ? req.file.path : null;

    animals.run(
        `INSERT INTO animals (name, type, location, reason, age, gender, breed, sterilization, vaccination, microchip, vet_passport, image_path, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, type, location, reason, age, gender, breed, sterilization, vaccination, microchip, vet_passport, image_path, description],
        function (err) {
            if (err) {
                console.error('Database error:', err); 
                return res.status(500).json({ message: 'Database error' });
              }
              res.status(200).json({ message: 'Success' });
        }
    );
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
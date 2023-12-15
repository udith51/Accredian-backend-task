const router = require('express').Router();
const bcrypt = require("bcrypt");
const db = require('../config/database');

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(checkUserQuery, [username, email], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "An error occured." });
            } else if (result.length > 0) {
                return res.status(400).json({ error: 'Username or email already in use' });
            }
            const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, hashedPwd], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error registering user' });
                }
                return res.status(200).json({ message: 'User registered successfully', user: { username: username, email: email } });
            });
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(checkUserQuery, [name, name], async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error checking user credentials' });
            } else if (result.length === 0) {
                return res.status(400).json({ error: 'Invalid username or email' });
            }
            const user = result[0];
            const validPsd = await bcrypt.compare(password, user.password);
            if (!validPsd) {
                return res.status(400).json({ error: 'Invalid password' });
            }
            return res.status(200).json({ message: 'Login successful', user: { name: user.username, email: user.email } });
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
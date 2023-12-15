const db = require('../config/database');

const router = require('express').Router();


router.get("/createdb", (req, res) => {
    let sql = 'CREATE DATABASE testauth';
    db.query(sql, (err, res) => {
        if (err)
            console.log(err);
        else {
            console.log("Database created");
            return res.status(200).send("Database created successfully");
        }
    })
})

router.get("/createusertable", (req, res) => {
    let sql = 'CREATE TABLE users (username VARCHAR(255) UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), PRIMARY KEY (username))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error creating table");
        } else {
            console.log("Table added");
            return res.status(200).send("Table created successfully");
        }
    });
});

module.exports = router;
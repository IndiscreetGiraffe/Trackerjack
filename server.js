const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
const EditorPrompt = require('inquirer/lib/prompts/editor');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: "Error"});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

app.post('/app/department', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO department (department_name)
                    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.get('/api/employeerole', (req, res) => {
    const sql = `SELECT * FROM employeerole`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(400).json({ error: "error"});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

app.post('/api/employeerole', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employeerole (title, salary, department_id)
                    VALUES (?, ?, ?)`;
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: "error" });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});



const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Octavia6114!',
        database: 'workerbees'
    },
    console.log('Youre connected to the hive')
);

module.exports = db;
const mysql = require('mysql');
const pool = mysql.createPool({
    host:'119.27.167.168',
    port:3306,
    user:'root',
    password:'qaz123,./',
    database:'sys_db'
})
module.exports = pool;
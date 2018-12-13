var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'thib',
    password: 'test',
    database: 'bd_notes'
});
module.exports = connection;

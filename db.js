var mysql      = require('mysql');
var connection = mysql.createPool({
  host: "localhost",
  user: "thib",
  password: "test",  
  database: "application"
});
module.exports=connection;
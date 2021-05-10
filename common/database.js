const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'to_do_lists'
})

db.getConnection((err, conn) => {
  if(err) throw err;
  console.log('Connected to mysql ID:' + conn.threadId);
})

module.exports = db;
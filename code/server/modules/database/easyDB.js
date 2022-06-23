const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('./modules/database/mydb.sqlite', (err) => {
  if (err) throw err;
});
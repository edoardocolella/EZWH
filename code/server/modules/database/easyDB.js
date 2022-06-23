const sqlite = require('sqlite3');

// open the database
exports.db = new sqlite.Database('./modules/database/db.db', (err) => {
  if (err) throw err;
});
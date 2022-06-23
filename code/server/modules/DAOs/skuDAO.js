const Exceptions = require('../../routers/exceptions');
const {db} = require('../database/easyDB')

"SELECT * FROM SKU"

// get all the exams
exports.getAllSkus = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM SKU";
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}
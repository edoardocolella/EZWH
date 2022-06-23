const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')

exports.getTestDescriptorsForSKU = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id FROM TestDescriptor WHERE idSKU = ?;`;
        db.all(sql, [id], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}
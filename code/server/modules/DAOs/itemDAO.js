const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')

exports.getAllItems = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Item;`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getItem = (id, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Item WHERE id= ? AND supplierId = ?;`;
        db.all(sql, [id, supplierId], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.getItemFromSkuId = (SKUId, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Item WHERE SKUid = ? AND supplierId = ?';
        db.all(sql, [SKUId, supplierId], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}



exports.createItem = (id, description, price, SKUId, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Item (id, description, price, SKUId, supplierId) VALUES (?,?,?,?,?);`;
        db.run(sql, [id, description, price, SKUId, supplierId], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.updateItem = (newDescription, newPrice, id, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE Item SET description= ? , price= ? WHERE id= ? AND supplierId = ?;`;
        db.run(sql, [newDescription, newPrice, id, supplierId], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.deleteItem = (id, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Item WHERE id = ? AND supplierId = ?;`;
        db.run(sql, [id, supplierId], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}
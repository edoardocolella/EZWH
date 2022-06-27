const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')


exports.getAllRestockOrders = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM RestockOrder;`;
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getIssuedRestockOrders = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM RestockOrder WHERE state = 'ISSUED';";
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getRestockOrder = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM RestockOrder WHERE id=?;`;
        db.all(sql, [id], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.getFailedProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Distinct RFID FROM TestResult WHERE Result = false';
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getCountRestock = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) FROM RestockOrder';
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0]["COUNT(*)"] + 1)
            }
        });
    });
}

exports.insertRestock = (id, dateToSave, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO RestockOrder ( id, issueDate, state, transportNote, supplierId) 
        VALUES (?, ?, "ISSUED", '', ?);`
        db.run(sql, [id, dateToSave, supplierId], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.insertSkuPerRestock = (id, SKUId, itemId, description, price, qty) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SKUPerRestockOrder (id, SKUid, itemId, description, price, qty) VALUES (?,?,?,?,?,?);`
        db.run(sql, [id, SKUId, itemId, description, price, qty], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.deleteRestockOrder = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM RestockOrder WHERE ID=?;`
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}
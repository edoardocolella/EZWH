const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')

// get all skus
exports.getAllSkuItems = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM SKUItem";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

// get all skusItems
exports.getSkuItems = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKUItem WHERE SKUId= ? AND available = 1;`;
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getSkuItem = (RFID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKUItem WHERE RFID= ?;`;
        db.all(sql, [RFID], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.getPositionForSku = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKU_in_Position WHERE SKUId = ?;`;
        db.all(sql, [id], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}


exports.createSkuItem = (RFID, SKUId, available, formattedDate) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) VALUES (?,?,?,?);`
        db.run(sql, [RFID, SKUId, available, formattedDate], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.editSkuItem = (newRFID, newAvailable, formattedDate, oldRFID) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE SKUItem SET RFID= ?, Available= ?,DateOfStock= ? WHERE RFID= ?;`;
        db.run(sql, [newRFID, newAvailable, formattedDate, oldRFID], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}


exports.deleteSkuItem = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM SKUItem WHERE RFID= ?;`;
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}





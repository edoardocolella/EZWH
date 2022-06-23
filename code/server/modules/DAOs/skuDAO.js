const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')

// get all skus
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

// get all skus
exports.getSku = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKU WHERE id=?;`;
        db.all(sql, [id], async (err, rows) => {
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

exports.getSkuForPosition = (postionId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKU_in_Position WHERE positionId = ?;`;
        db.all(sql, [postionId], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.checkPositionForSku = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM SKU_in_Position SP JOIN Position P WHERE SP.positionID=P.positionID AND SP.SKUId = ?`;
        db.all(sql, [id], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}



exports.createSKU = (weight, volume, price, notes, description, availableQuantity) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`
        db.run(sql, [weight, volume, price, notes, description, availableQuantity], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.editSKU = (newWeight, newVolume, newPrice, newNotes, newDescription, newAvailableQuantity, id) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE SKU SET weight = ?, volume = ?, price = ? ,
                    notes = ?, description = ?, 
                     availableQuantity= ? WHERE ID = ?;`;
        db.run(sql, [newWeight, newVolume, newPrice, newNotes, newDescription, newAvailableQuantity, id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}


exports.deleteSKU = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM SKU WHERE id= ?`;
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}





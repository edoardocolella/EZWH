const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')


exports.getPositions = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Position;`;
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getPosition = (positionId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Position WHERE positionID = ?;`;
        db.all(sql, [positionId], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.editPosition = (occupiedWeight, occupiedVolume, positionId) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE Position SET occupiedWeight = ?, occupiedVolume = ? WHERE positionID = ?;`;
        db.run(sql, [occupiedWeight, occupiedVolume, positionId], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.insertPosition = (positionID, maxVolume, maxWeight, aisleID, row, col, occupiedWeight, occupiedVolume) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Position (positionID, maxVolume, maxWeight, aisleID, row, col, 
            occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?);`;
        db.run(sql, [positionID, maxVolume, maxWeight, aisleID, row, col, occupiedWeight, occupiedVolume], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.deletePosition = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Position WHERE positionID = ?;`;
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}


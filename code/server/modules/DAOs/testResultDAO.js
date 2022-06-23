const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')

exports.getTestResults = (rfid) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM TestResult WHERE RFID= ?;`;
        db.all(sql, [rfid], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getTestResult = (rfid, id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM TestResult WHERE rfid= ? AND ID= ?;`;
        db.all(sql, [rfid, id], (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.createTestResult = (idTestDescriptor, rfid, dateToSave, result) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO TestResult ( idTestDescriptor, RFID, date, result)  VALUES ( ?, ?, ?, ?);`
        db.run(sql, [idTestDescriptor, rfid, dateToSave, result], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.editTestResult = (newIdTestDescriptor, dateToSave, newResult, id, rfid) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE TestResult SET idtestDescriptor= ?, date= ?, result=? WHERE ID= ? AND RFID = ?;`;
        db.run(sql, [newIdTestDescriptor, dateToSave, newResult, id, rfid], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.deleteTestResult = (id, rfid) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM TestResult WHERE ID= ? AND RFID= ?;`;
        db.run(sql, [id, rfid], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}
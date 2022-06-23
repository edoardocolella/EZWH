const Exceptions = require('../../routers/exceptions');
const { db } = require('../database/easyDB')


exports.getAllTestDescriptors = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM TestDescriptor;";
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.getTestDescriptor = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM TestDescriptor WHERE ID= ?;`;
        db.all(sql, [id], async (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows[0])
            }
        });
    });
}

exports.getTestDescriptorsForSKU = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id FROM TestDescriptor WHERE idSKU = ?;`;
        db.all(sql, [id],  (err, rows) => {
            if (err)
                reject(new Exceptions(500));
            else {
                resolve(rows)
            }
        });
    });
}

exports.createTestDescriptor = (name, procedureDescription, idSKU) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) VALUES ( ?, ?, ?);`;
        db.run(sql, [name, procedureDescription, idSKU], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.updateTestDescriptor = (newName, newProcedureDescription, newIdSKU, id) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE TestDescriptor SET name= ?, procedureDescription= ?, idSku = ? WHERE ID= ?;`;
        db.run(sql, [newName, newProcedureDescription, newIdSKU, id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}

exports.deleteTestDescriptor = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM TestDescriptor WHERE ID= ?;`;
        db.run(sql, [id], (err) => {
            if (err) {
                console.log("Database run error: err", err);
                reject(new Exceptions(500));
            }
            else resolve(true);
        })
    })
}
const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.ENV_DB_HOST,
    user: process.env.ENV_DB_USER,
    password: process.env.ENV_DB_PASSWORD,
    database: process.env.ENV_DB_NAME
});

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                console.log('EErr')
                reject(error);
                return;
            }
            console.log('FIN TO CONNECT DB')
            resolve(results);
        });
    });
};


module.exports = {
    query
};
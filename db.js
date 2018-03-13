const mysql = require('mysql');
const config = require('./config');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

let selectAll = () => {

    const tableName = '`react-antd`.`table`';
    let _sql = `
        SELECT * FROM ${tableName}
    `;
    return query(_sql);
};

let deleteOne = (id) => {
    const tableName = '`react-antd`.`table`';
    const key = '`key`';
    let _sql = `
    DELETE FROM ${tableName} WHERE ${key}=${id}
    `;
    console.log(_sql);
    return query(_sql);
};

let generateRandom = () => {
    const tableName = '`react-antd`.`table`';
    const keys = {
        key: '`key`',
        name: '`name`',
        age: '`age`',
        address: '`address`'
    };
    // (1, "ds", 22, "dsds")
    let values = '';
    for (let i = 0; i < 10; i++) {
        values += `(${i}, "ds", ${i+20}, "dsds"),`;
    }
    values += '(10, "ds", 30, "dsds")';
    let _sql = `
        INSERT INTO ${tableName} (${keys.key},${keys.name},${keys.age},${keys.address})
        VALUES ${values}
    `;
    console.log(_sql);

    return query(_sql);
};

let authorize = (loginInfo) => {
    const userInfo = {
        userName: 'xiaoxiang',
        password: '123456'
    };
    return (loginInfo.userName === userInfo.userName && loginInfo.password === userInfo.password) ? true : false;
};

module.exports = {
    // 暴露方法
    selectAll,
    deleteOne,
    generateRandom,
    authorize
};

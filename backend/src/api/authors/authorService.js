const pool = require("../../database/db");

const registerAuthorFunc = (data, callback) => {
    pool.query(
        `insert into yazarlar(ad,soyad)
                    values(?,?)`,
        [
            data.ad,
            data.soyad
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}
const deleteAuthorFunc = (id, callback) => {
    pool.query(
        `delete from kitap_yazar where yazar_id=${id}`,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            pool.query(
                `delete from yazarlar where ID=${id}`,
                [],
                (error, results, fields) => {
                    if (error) return callback(error)
                    return callback(null, results);
                }
            )

        }

    )
}

const allAuthorsFunc = (callback) => {
    pool.query(
        `select * from yazarlar`,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

module.exports = {
    registerAuthorFunc,
    deleteAuthorFunc,
    allAuthorsFunc
}
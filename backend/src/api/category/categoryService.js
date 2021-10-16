const pool = require("../../database/db");

const addCategoryFunc = (data, callback) => {
    pool.query(
        `
            insert into kategoriler(tur)
                    values(?)
        `,
        [
            data.tur
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const deleteCategoryFunc = (id, callback) => {
    pool.query(
        `
                delete from kategoriler where ID=?
            `,
        [
            id
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const getAllCategoriesFunc = (callback) => {
    pool.query(
        `select * from kategoriler`,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

module.exports = {
    addCategoryFunc,
    deleteCategoryFunc,
    getAllCategoriesFunc
}
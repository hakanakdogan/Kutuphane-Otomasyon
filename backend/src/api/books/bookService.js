const pool = require("../../database/db");

const addBookFunc = (data, callback) => {
    pool.query(
        `
        select kitap_ISBN from kutuphane_kitap where kitap_ISBN=? and kutuphane_kitap.kutuphane_id=?
        `,
        [
            data.ISBN,
            data.kutuphaneID
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            if (results.length > 0) {
                pool.query(
                    `
                    UPDATE kitaplar SET miktar = miktar + ? WHERE ISBN=?
                    `,
                    [data.miktar, data.ISBN],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        pool.query(
                            `
                            UPDATE kutuphane_kitap SET miktar=miktar+?, uygun_miktar=uygun_miktar+? WHERE kitap_ISBN=? AND kutuphane_id=?
                            `,
                            [
                                data.miktar,
                                data.miktar,
                                data.ISBN,
                                data.kutuphaneID

                            ],
                            (error, results, fields) => {
                                if (error) return callback(error)
                                return callback(null, results);
                            }
                        )
                    }
                )
            } else {
                pool.query(
                    `
                    select ISBN from kitaplar where ISBN=? 
                    `,
                    [
                        data.ISBN,

                    ],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        if (results.length > 0) {
                            pool.query(
                                `
                                UPDATE kitaplar SET miktar=miktar+? WHERE ISBN=? 
                                `,
                                [
                                    data.miktar,
                                    data.ISBN,


                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error)
                                    pool.query(
                                        `
                                        INSERT INTO kutuphane_kitap(kitap_ISBN,kutuphane_id,miktar,uygun_miktar)
                                                            values(?,?,?,?) 
                                        `,
                                        [
                                            data.ISBN,
                                            data.kutuphaneID,
                                            data.miktar,
                                            data.miktar

                                        ],
                                        (error, results, fields) => {
                                            if (error) return callback(error)
                                            return callback(null, results);
                                        }
                                    )
                                }
                            )
                        } else {
                            pool.query(
                                `
                                    insert into kitaplar(ISBN,ad,yayin_bilgileri,miktar)
                                                values(?,?,?,?)
                                `,
                                [
                                    data.ISBN,
                                    data.ad,
                                    data.yayin_bilgileri,
                                    data.miktar
                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error)

                                    pool.query(

                                        `insert into kitap_kategori(kitap_ISBN,kategori_id)
                                        values(?,?)
                                            `,
                                        [
                                            data.ISBN,
                                            data.kategori_id
                                        ],
                                        (error, results, fields) => {
                                            if (error) return callback(error)
                                            pool.query(

                                                `
                                                    insert into kitap_yazar(kitap_ISBN,yazar_id)
                                                                values(?,?)
                                                `
                                                ,
                                                [
                                                    data.ISBN,
                                                    data.yazar_id
                                                ],
                                                (error, results, fields) => {
                                                    if (error) return callback(error)
                                                    pool.query(
                                                        `
                                                        insert into kutuphane_kitap(kitap_ISBN,kutuphane_id, miktar, uygun_miktar)
                                                                        values(?,?,?,?)
                                                        `,
                                                        [
                                                            data.ISBN,
                                                            data.kutuphaneID,
                                                            data.miktar,
                                                            data.miktar
                                                        ],
                                                        (error, results, fields) => {
                                                            if (error) return callback(error);
                                                            return callback(null, results);
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    }
                )
            }
        }
    )
}


const deleteBookFunc = (data, callback) => {
    pool.query(
        `
        select miktar from kitaplar WHERE ISBN=? 
        `,
        [
            data.isbn,

        ],
        (error, results, fields) => {
            if (error) return callback(error);


            if (Number(results[0].miktar) >= Number(data.miktar)) {

                pool.query(
                    `
                    select miktar, uygun_miktar from kutuphane_kitap where kitap_ISBN=? AND kutuphane_id=?
                    `,
                    [
                        data.isbn,
                        data.kutuphaneID,

                    ],
                    (error, results, fields) => {
                        if (error) return callback(error);


                        if (results.length > 0) {

                            if (Number(results[0].miktar) >= Number(data.miktar) && Number(results[0].uygun_miktar) >= Number(data.miktar)) {

                                pool.query(
                                    `
                                    UPDATE kutuphane_kitap SET miktar=miktar-?, uygun_miktar=uygun_miktar-? WHERE kitap_ISBN=? AND kutuphane_id=?
                                    `,
                                    [
                                        data.miktar,
                                        data.miktar,
                                        data.isbn,
                                        data.kutuphaneID,

                                    ],
                                    (error, results, fields) => {
                                        if (error) return callback(error);
                                        pool.query(
                                            `
                                            UPDATE kitaplar SET miktar=miktar-? WHERE ISBN=? 
                                            `,
                                            [
                                                data.miktar,

                                                data.isbn,


                                            ],
                                            (error, results, fields) => {
                                                if (error) return callback(error);
                                                pool.query(
                                                    `
                                                    SELECT miktar, uygun_miktar FROM kutuphane_kitap WHERE kitap_ISBN=? AND kutuphane_ID=?
                                                    `,
                                                    [
                                                        data.isbn,
                                                        data.kutuphaneID
                                                    ],
                                                    (error, results, fields) => {
                                                        if (error) return callback(error);
                                                        if (results[0].miktar <= 0) {
                                                            pool.query(
                                                                `
                                                                DELETE FROM kutuphane_kitap WHERE kitap_ISBN =?
                                                                `,
                                                                [
                                                                    data.isbn
                                                                ],
                                                                (error, results, fields) => {
                                                                    if (error) return callback(error);
                                                                    pool.query(
                                                                        `
                                                                        SELECT miktar FROM kitaplar WHERE ISBN=?
                                                                        `,
                                                                        [
                                                                            data.isbn
                                                                        ],
                                                                        (error, results, fields) => {
                                                                            if (error) return callback(error);
                                                                            if (results[0].miktar <= 0) {
                                                                                pool.query(
                                                                                    `delete from kitap_yazar where kitap_ISBN=?`,
                                                                                    [
                                                                                        data.isbn
                                                                                    ],
                                                                                    (error, results, fields) => {
                                                                                        if (error) return callback(error)
                                                                                        pool.query(
                                                                                            `select miktar from kutuphane_kitap WHERE kitap_ISBN=? AND kutuphane_id=?`,
                                                                                            [
                                                                                                data.isbn,
                                                                                                data.kutuphaneID
                                                                                            ],
                                                                                            (error, results, fields) => {
                                                                                                if (error) return callback(error)
                                                                                                if (results.length > 0) {

                                                                                                    pool.query(
                                                                                                        `
                                                                                                        delete from kitap_kategori where kitap_ISBN=? 
                                                                                                        `,
                                                                                                        [
                                                                                                            data.isbn
                                                                                                        ],
                                                                                                        (error, results, fields) => {
                                                                                                            if (error) return callback(error)
                                                                                                            pool.query(
                                                                                                                `
                                                                                                                delete from kitaplar where ISBN=?
                                                                                                                `,

                                                                                                                [
                                                                                                                    data.isbn
                                                                                                                ],
                                                                                                                (error, results, fields) => {
                                                                                                                    if (error) return callback(error)
                                                                                                                    return callback(null, results);
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    )
                                                                                                } else {
                                                                                                    return callback(null, { message: "Başarıyla silindi" });
                                                                                                }
                                                                                            }
                                                                                        )

                                                                                    }
                                                                                )
                                                                            } else {
                                                                                return callback(null, { message: "Başarıyla silindi" });
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        } else {
                                                            return callback(null, { message: "Başarıyla silindi" });
                                                        }
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                            else {
                                callback(null, { message: "Girdiğiniz miktar kütüphanede müsait olan kitap miktardan daha büyük" })
                            }
                        } else {
                            pool.query(
                                `
                                UPDATE kitaplar SET miktar=miktar-? WHERE ISBN=? 
                                `,
                                [
                                    data.miktar,

                                    data.isbn,


                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error);
                                    pool.query(
                                        `
                                        SELECT miktar FROM kitaplar WHERE ISBN=?
                                        `,
                                        [data.isbn],
                                        (error, results, fields) => {
                                            if (error) return callback(error)
                                            if (results[0].miktar <= 0) {
                                                pool.query(
                                                    `delete from kitap_yazar where kitap_ISBN=?`,

                                                    [
                                                        data.isbn
                                                    ],
                                                    (error, results, fields) => {
                                                        if (error) return callback(error)
                                                        pool.query(
                                                            `
                                                            delete from kitap_kategori where kitap_ISBN=? 
                                                            `,
                                                            [
                                                                data.isbn
                                                            ],
                                                            (error, results, fields) => {
                                                                if (error) return callback(error)
                                                                pool.query(
                                                                    `
                                                                    delete from kitaplar where ISBN=?
                                                                    `,

                                                                    [
                                                                        data.isbn
                                                                    ],
                                                                    (error, results, fields) => {
                                                                        if (error) return callback(error)
                                                                        return callback(null, results);
                                                                    }
                                                                )
                                                            }
                                                        )
                                                    }
                                                )
                                            } else {
                                                return callback(null, { message: "Başarıyla silindi" });
                                            }
                                        }
                                    )
                                }
                            )
                        }
                    }
                )
            }
            else {
                callback(null, { message: "Girdiğiniz miktar mevcut kitap miktarından daha büyük" })
            }
        }
    )

}


module.exports = {
    addBookFunc,
    deleteBookFunc
}
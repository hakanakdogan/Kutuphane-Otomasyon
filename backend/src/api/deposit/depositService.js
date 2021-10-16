const pool = require("../../database/db");

const giveDepositFunc = (data, callback) => {
    pool.query(
        `
            select kitap_ISBN, miktar, uygun_miktar from kutuphane_kitap where kitap_ISBN=? AND kutuphane_id=?
        `,
        [
            data.isbn,
            data.kutuphaneID
        ],
        (error, results, fields) => {
            if (error) return callback(error);

            if (results.length > 0) {
                if (results[0].uygun_miktar <= 0) {
                    return callback(null, { message: "Böyle bir kayıt bulunmamaktadır" });

                } else {
                    pool.query(
                        `
                        select * from emanet where kutuphane_id=? AND uye_id=?
                        `,
                        [
                            data.kutuphaneID,
                            data.uyeID

                        ],
                        (error, results, fields) => {
                            if (error) return callback(error);
                            if (results.length > 0) {
                                return callback(null, { message: "Bu kullanıcı zaten kütüphaneden kitap almış" });

                            } else {
                                pool.query(
                                    `
                                        INSERT INTO emanet(kutuphane_id,uye_id,kitap_isbn,alinma_tarihi,teslim_tarihi)
                                                        values(?,?,?,?,?)
                                    `,
                                    [
                                        data.kutuphaneID,
                                        data.uyeID,
                                        data.isbn,
                                        new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        new Date(Date.now() + 1296000000).toISOString().slice(0, 19).replace('T', ' ')
                                    ],
                                    (error, results, fields) => {
                                        if (error) return callback(error);
                                        pool.query(
                                            `
                                            UPDATE kutuphane_kitap SET uygun_miktar=uygun_miktar-1 WHERE kitap_ISBN=? AND kutuphane_id=?
                                            `,
                                            [
                                                data.isbn,
                                                data.kutuphaneID
                                            ],
                                            (error, results, fields) => {
                                                if (error) return callback(error)
                                                return callback(null, { message: "Emanet Verildi" });
                                            }
                                        )
                                    }
                                )
                            }

                        }
                    )
                }
            } else {
                return callback(null, { message: "Böyle bir kayıt bulunmamaktadır" });
            }
        }
    )
}

const takeBackDepositFunc = (data, callback) => {
    pool.query(
        `
        SELECT kitap_ISBN, kutuphane_id from kutuphane_kitap WHERE kitap_ISBN=? AND kutuphane_id=?
        `,
        [
            data.isbn,
            data.kutuphaneID
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            if (results.length > 0) {
                pool.query(
                    `
                    SELECT kitap_ISBN, kutuphane_id, uye_id from emanet WHERE kitap_ISBN=? AND kutuphane_id=? AND uye_id=?
                    `,
                    [
                        data.isbn,
                        data.kutuphaneID,
                        data.uyeID
                    ],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        if (results.length > 0) {
                            pool.query(
                                `
                                DELETE FROM emanet WHERE kitap_ISBN=? AND kutuphane_id=? AND uye_id=?
                                `,
                                [
                                    data.isbn,
                                    data.kutuphaneID,
                                    data.uyeID
                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error)
                                    pool.query(
                                        `
                                        UPDATE kutuphane_kitap SET uygun_miktar=uygun_miktar+1 WHERE kitap_ISBN=? AND kutuphane_id=?
                                        `,
                                        [
                                            data.isbn,
                                            data.kutuphaneID
                                        ],
                                        (error, results, fields) => {
                                            if (error) return callback(error)
                                            return callback(null, { message: "Emanet Başarıyla Geri Alındı" });
                                        }
                                    )
                                }
                            )
                        } else {
                            return callback(null, { message: "Böyle bir kayıt bulunmamaktadır" });
                        }
                    }
                )
            } else {
                return callback(null, { message: "Böyle bir kayıt bulunmamaktadır" });
            }
        }
    )
}

const getUsersDepositedBooksFunc = (id, callback) => {
    pool.query(
        `
        SELECT * from emanet WHERE uye_id=? 
        `,
        [
            id
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            if (results.length > 0) {
                pool.query(
                    `
                    SELECT kitaplar.ISBN, kitaplar.ad AS kitap_ad, yazarlar.ad AS yazar_ad, yazarlar.soyad AS yazar_soyad, kategoriler.tur AS tur, alinma_tarihi,teslim_tarihi from ((((((emanet 
                        inner join kitaplar on kitaplar.ISBN=emanet.kitap_ISBN)
                        inner join kutuphane on kutuphane.ID=emanet.kutuphane_id)
                        inner join kitap_yazar on kitap_yazar.kitap_ISBN=emanet.kitap_ISBN)
                        inner join yazarlar on yazarlar.ID=kitap_yazar.yazar_id)
                        inner join kitap_kategori on kitap_kategori.kitap_ISBN=emanet.kitap_ISBN  )
                        inner join kategoriler on kategoriler.ID=kitap_kategori.kategori_id )
                        WHERE emanet.uye_id=?

                    
                    `,
                    [
                        id
                    ],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        return callback(null, results);
                    }
                )
            } else {
                return callback(null, { message: "Kullanıcı henüz emanet kitap almamış." });
            }
        }
    )
}

const getLibrariesDepositsF = (id, callback) => {
    pool.query(
        `
        SELECT kitaplar.ad AS kitap_ad,kitaplar.ISBN,uyeler.ad AS uye_ad,uyeler.soyad AS uye_soyad,uyeler.telefon, emanet.emanet_no, emanet.alinma_tarihi,emanet.teslim_tarihi FROM ((emanet
            inner join kitaplar ON kitaplar.ISBN = emanet.kitap_ISBN )
            inner join uyeler ON uyeler.ID=emanet.uye_id) WHERE emanet.kutuphane_id =?
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


module.exports = {
    giveDepositFunc, takeBackDepositFunc, getUsersDepositedBooksFunc, getLibrariesDepositsF
}
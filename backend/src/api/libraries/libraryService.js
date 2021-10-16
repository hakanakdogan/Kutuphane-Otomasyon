const pool = require("../../database/db");

const createLibraryFunc = (data, callback) => {
    pool.query(
        `insert into adresler( il, ilce, tam_adres)
                    values(?,?,?)`,
        [
            data.il,
            data.ilce,
            data.tam_adres
        ],
        (error, results, fields) => {
            if (error) callback(error);

            const addressId = results.insertId;

            pool.query(
                `insert into kutuphane(adres_id, isim, admin_id)
                            values(?,?,?)
                `,
                [
                    addressId,
                    data.isim,
                    data.admin_id
                ],
                (error, results, fields) => {
                    if (error) callback(error);

                    pool.query(
                        `update uyeler set admin=? where ID=?`,
                        [
                            1,
                            data.admin_id
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
}

const getAllLibrariesFunc = (callback) => {
    pool.query(
        `select kutuphane.ID, isim, il, ilce, tam_adres from kutuphane 
        inner join adresler on kutuphane.adres_id=adresler.ID`,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const getLibraryFunc = (id, callback) => {
    pool.query(
        `select kutuphane.ID, isim, il, ilce, tam_adres from kutuphane
        inner join adresler on kutuphane.adres_id=adresler.ID where kutuphane.ID=${id}`,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const registerLibraryFunc = ({ libID, userID }, callback) => {
    pool.query(
        `insert into uye_kutuphane(uye_id,kutuphane_id )
                    values(?,?)`,
        [
            userID,
            libID
        ],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}


const getAllRegisteredFunc = (id, callback) => {
    pool.query(
        `select kutuphane.ID, isim, il, ilce, tam_adres,uye_id, kutuphane_id from ((kutuphane 
        inner join uye_kutuphane on uye_kutuphane.kutuphane_id = kutuphane.ID)
        inner join adresler on adresler.ID = kutuphane.adres_id)
        where uye_kutuphane.uye_id=${id} `,
        [],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}



const getAdminLibraryFunc = (id, callback) => {
    pool.query(
        `select kutuphane.ID, isim, il, ilce, tam_adres, admin_id, adres_id from kutuphane
        inner join adresler on kutuphane.adres_id=adresler.ID where kutuphane.admin_id=?`,
        [id],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const updateLibraryFunc = (data, callback) => {
    let oldAddress = data.adres_id;
    pool.query(
        `insert into adresler( il, ilce, tam_adres)
            values(?,?,?)
        `,
        [data.il, data.ilce, data.tam_adres],
        (error, results, fields) => {
            if (error) callback(error);

            // HATA YOKSA
            const addressId = results.insertId;

            pool.query(
                `update kutuphane set isim=?, adres_id=? where ID=?
            `,
                [
                    data.isim,
                    addressId,
                    data.ID,
                ],
                (error, results, fields) => {
                    if (error) callback(error);

                    if (oldAddress != "2") {
                        pool.query(
                            `DELETE FROM adresler WHERE ID=?`,
                            [oldAddress],
                            (error, results, fields) => {
                                if (error) return callback(error);
                            }
                        );
                    }

                    return callback(null, results);
                }
            );
        }
    );
};


const getNearestLibraryFunc = (id, callback) => {
    pool.query(
        `select uyeler.ID,il,ilce,tam_adres from uyeler
          inner join adresler on uyeler.adres=adresler.ID 
          where uyeler.ID=${id}`,
        [],
        (error, results, fields) => {
            if (error) return callback(error);

            pool.query(
                `select kutuphane.ID, isim, tam_adres, il, ilce from kutuphane
          inner join adresler on kutuphane.adres_id=adresler.ID
          where il=? AND ilce=? LIMIT 1`,
                [results[0].il, results[0].ilce],
                (error, results, fields) => {
                    if (error) return callback(error);

                    return callback(null, results);
                }
            );

        }
    );

};

const getLibsBooksFunc = (id, callback) => {
    pool.query(
        `
      select kitaplar.ISBN, kutuphane_kitap.miktar, uygun_miktar, kitaplar.ad as kitap_ad, yayin_bilgileri, yazarlar.ad, yazarlar.soyad from (((kutuphane_kitap 
      inner join kitaplar on kutuphane_kitap.kitap_ISBN=kitaplar.ISBN ) 
      inner join kitap_yazar on kitap_yazar.kitap_ISBN=kitaplar.ISBN)
      inner join yazarlar on kitap_yazar.yazar_id=yazarlar.ID)
      where kutuphane_id=?
      
      `,
        [id],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const getLibsUsersFunc = (id, callback) => {

    pool.query(
        `
      select uyeler.ID, ad, soyad, telefon from uye_kutuphane 
      inner join uyeler on uyeler.ID=uye_kutuphane.uye_id
      where uye_kutuphane.kutuphane_id=?
      `,
        [id],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const deleteUserFromLibraryFunc = (data, callback) => {
    pool.query(
        `
      SELECT * from uye_kutuphane WHERE uye_id=? AND kutuphane_id=?
      `,
        [data.uyeID, data.kutuphaneID],
        (error, results, fields) => {
            if (error) return callback(error)
            if (results.length > 0) {
                pool.query(
                    `select * from emanet where kutuphane_id=? AND uye_id=?`,
                    [
                        data.kutuphaneID,
                        data.uyeID

                    ],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        if (results.length > 0) {
                            return callback(null, { message: "Kullanıcı bu kütüphaneden halihazırda emanet almış" })
                        } else {
                            pool.query(
                                `
                                    DELETE FROM uye_kutuphane WHERE kutuphane_id=? AND uye_id=?
                                `,
                                [
                                    data.kutuphaneID,
                                    data.uyeID
                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error)
                                    return callback(null, { message: "Kullanıcı kütüphane sisteminden başarıyla silindi!" })
                                }
                            )
                        }
                    }
                )
            } else {
                return callback(null, { message: "Kullanıcı Kütüphanede Yok" })
            }
        }
    )
}

const removeLibF = (id, callback) => {
    pool.query(
        `
            SELECT * FROM kutuphane WHERE ID=?
        `,
        [
            id
        ],
        (error, results, fields) => {

            if (error) return callback(error)
            if (results.length > 0) {
                const adres_id = results[0].adres_id;
                const admin_id = results[0].admin_id;
                pool.query(
                    `
                        SELECT * FROM emanet WHERE kutuphane_id=?
                    `,
                    [
                        id
                    ],
                    (error, results, fields) => {
                        if (error) return callback(error)
                        if (results.length > 0) {
                            return callback(null, { message: "Kullanıcılar Emanet Almış, Lütfen Kütüphaneyi Silmeden Önce Gerekli Alanları Temizleyin" });
                        } else {
                            pool.query(
                                `
                                    SELECT * FROM uye_kutuphane WHERE kutuphane_id=?
                                `,
                                [
                                    id
                                ],
                                (error, results, fields) => {
                                    if (error) return callback(error)
                                    if (results.length > 0) {
                                        return callback(null, { message: "Kütüphanede Üyeler Var, Lütfen Kütüphaneyi Silmeden Önce Gerekli Alanları Temizleyin" });
                                    } else {
                                        pool.query(
                                            `
                                                SELECT * FROM kutuphane_kitap WHERE kutuphane_id=?
                                            `,
                                            [
                                                id
                                            ],
                                            (error, results, fields) => {
                                                if (error) return callback(error)
                                                if (results.length > 0) {
                                                    return callback(null, { message: "Kütüphanede Kitaplar Var, Lütfen Kütüphaneyi Silmeden Önce Gerekli Alanları Temizleyin" });
                                                } else {
                                                    pool.query(
                                                        `
                                                           DELETE FROM kutuphane WHERE ID=? 
                                                        `,
                                                        [
                                                            id
                                                        ],
                                                        (error, results, fields) => {
                                                            if (error) return callback(error)
                                                            pool.query(
                                                                `
                                                                    DELETE FROM adresler WHERE ID=?
                                                                `,
                                                                [
                                                                    adres_id
                                                                ],
                                                                (error, results, fields) => {
                                                                    if (error) return callback(error)
                                                                    pool.query(
                                                                        `
                                                                            UPDATE uyeler SET admin=0 WHERE ID=?
                                                                        `,
                                                                        [
                                                                            admin_id
                                                                        ],
                                                                        (error, results, fields) => {
                                                                            if (error) return callback(error)
                                                                            return callback(null, { message: "Kütüphane başarıyla silindi!" })
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
                    }
                )
            } else {
                return callback(null, { message: "Böyle bir kütüphane yok" })
            }
        }
    )
}

module.exports = {
    getAllLibrariesFunc,
    getLibraryFunc,
    registerLibraryFunc,
    getAllRegisteredFunc,
    createLibraryFunc,
    getAdminLibraryFunc,
    updateLibraryFunc,
    getNearestLibraryFunc,
    getLibsBooksFunc,
    getLibsUsersFunc,
    deleteUserFromLibraryFunc,
    removeLibF
}
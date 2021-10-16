const pool = require("../../database/db");

const create = (data, callback) => {
    pool.query(
        `insert into uyeler( ad, soyad, telefon, eposta, sifre)
                values(?,?,?,?,?)
    `,
        [
            data.ad,
            data.soyad,
            data.telefon,
            data.eposta,
            data.sifre
        ],
        (error, results, fields) => {
            if (error) callback(error);

            return callback(null, results)
        }
    );
}

const getUsers = (callback) => {
    console.log("smgnsd")
    pool.query(
        `select ID,ad,soyad from uyeler`,
        [],
        (error, results, fields) => {

            if (error) return callback(error)
            return callback(null, results);
        }
    )
}

const getUserByUserId = (id, callback) => {
    pool.query(
        `select ID, ad, soyad, telefon, eposta from uyeler where ID=?`,
        [id],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results[0]);
        }
    )
}

const updateUserFunc = (data, callback) => {
    let oldAddress = 2;
    pool.query(
        "SELECT ID,adres FROM uyeler WHERE ID=?",
        [data.ID],
        (error, results, fields) => {
            if (error) return callback(error);
            oldAddress = results[0].adres;
            // hata yoksa;

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
                        `update uyeler set ad=?, soyad=?, telefon=? , eposta=?, adres=? where ID=?
                    `,
                        [
                            data.ad,
                            data.soyad,
                            data.telefon,
                            data.eposta,
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
        }
    );
};

const deleteUser = (data, callback) => {
    pool.query(
        `delete from uyeler where ID=?`,
        [data.ID],
        (error, results, fields) => {
            if (error) return callback(error)
            return callback(null, results[0])
        }
    )
}

const getUserByEmail = (eposta, callback) => {
    pool.query(
        `select uyeler.ID,ad,sifre,soyad,telefon,eposta,admin,il,ilce,tam_adres from uyeler
        inner join adresler on adresler.ID=uyeler.adres where eposta = ?`,
        [eposta],
        (error, results, fields) => {
            console.log(results[0])
            if (error) return callback(error)
            return callback(null, results[0])
        }
    )
}

const registerUserToLibF = (data, callback) => {
    pool.query(
        `
        insert into uye_kutuphane (uye_id, kutuphane_id)
                                values(?,?)
        `,
        [data.uyeID, data.kutuphaneID],
        (error, results, fields) => {
            if (error) return callback(error);
            return callback(null, results)
        }
    )
}

const removeUserFromLibF = (data, callback) => {
    pool.query(
        `
      delete from uye_kutuphane where uye_id=? and kutuphane_id=?
      `,
        [data.uyeID, data.kutuphaneID],
        (error, results, fields) => {
            if (error) return callback(error);
            return callback(null, results)
        }
    )
}

module.exports = {
    create,
    getUsers,
    getUserByUserId,
    updateUserFunc,
    deleteUser,
    getUserByEmail,
    registerUserToLibF,
    removeUserFromLibF
}
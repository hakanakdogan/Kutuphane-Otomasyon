const { create, deleteUser, getUserByUserId, getUsers, updateUserFunc, getUserByEmail, registerUserToLibF, removeUserFromLibF } = require("./userService");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


const createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(8);
    body.sifre = hashSync(body.sifre, salt);
    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection errror"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

const getUserById = (req, res) => {

    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found.."
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
}



const login = (req, res) => {

    const body = req.body;
    getUserByEmail(body.eposta, (err, results) => {
        if (err) console.log(err)
        if (!results) {
            return res.json({
                success: 0,
                data: "Invalid Credentials"
            })
        }
        const result = compareSync(body.sifre, results.sifre);
        if (result) {
            result.sifre = undefined;
            console.log("logindeki results:")
            console.log(results.ID)

            req.session.user = results;
            req.session.save((err) => {

                if (!err) {
                    console.log("session save içi");
                    console.log(req.session);

                }
            });


            return res.send({
                success: 1,
                message: "Login successfull",
                user: {
                    ID: results.ID,
                    ad: results.ad,
                    soyad: results.soyad,
                    telefon: results.telefon,
                    eposta: results.eposta,
                    adres: results.adres,
                    sifre: results.sifre,
                    admin: results.admin,
                    il: results.il,
                    ilce: results.ilce,
                    tamAdres: results.tam_adres
                }
            })
        } else {
            return res.send({
                success: 0,
                data: "Invalid Credentials"
            })
        }


    });
}
const loginG = (req, res) => {
    console.log("LOGING:")
    console.log(req.session)
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
}

const logOut = (req, res) => {
    console.log("LOGOUT ÇALIŞTI")
    req.session.destroy((err) => {
        res.clearCookie("ID").send('cleared cookie');
    });
}


const updateUser = (req, res) => {
    let body = req.body;
    updateUserFunc(body, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(results)
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found.."
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
}



const getAllUsers = (req, res) => {
    console.log(".dlfhfh")
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(results)
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found... "
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })

}

const registerUserToLib = (req, res) => {
    const uyeID = req.params.uyeID;
    const kutuphaneID = req.params.kutuphaneID
    const data = {
        uyeID,
        kutuphaneID
    }
    registerUserToLibF(data, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(results)
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found... "
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
}

const removeUserFromLib = (req, res) => {
    const data = req.body;
    removeUserFromLibF(data, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(results)
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found... "
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })

}

module.exports = {
    createUser,
    getUserById,
    login,
    updateUser,
    getAllUsers,
    registerUserToLib,
    removeUserFromLib,
    loginG,
    logOut
}
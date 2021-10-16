const { getAllLibrariesFunc, getLibraryFunc, registerLibraryFunc, getAllRegisteredFunc, createLibraryFunc, getAdminLibraryFunc, updateLibraryFunc, getNearestLibraryFunc, getLibsBooksFunc, getLibsUsersFunc, deleteUserFromLibraryFunc, removeLibF } = require("./libraryService");


const createLibrary = (req, res) => {
    const data = req.body;
    createLibraryFunc(data, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Libraries not found"
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
}

const getAllLibraries = (req, res) => {
    getAllLibrariesFunc((err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Libraries not found"
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
}


const getLibrary = (req, res) => {
    const id = req.params.id;
    getLibraryFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}
const registerLibrary = (req, res) => {
    const libID = req.params.libID;
    const userID = req.params.userID;
    console.log(req.user);
    registerLibraryFunc({ libID, userID }, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Bir Hata Oluştu"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

const getAllRegistered = (req, res) => {
    const id = req.params.userID;
    getAllRegisteredFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Bir Hata Oluştu"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}


const getAdminLibrary = (req, res) => {
    const adminId = req.params.adminId;
    getAdminLibraryFunc(adminId, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

const updateLib = (req, res) => {
    let body = req.body;
    updateLibraryFunc(body, (err, results) => {
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

const getNearestLibrary = (req, res) => {
    const id = req.params.userId;
    getNearestLibraryFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}
const getLibsBooks = (req, res) => {
    const id = req.params.id;
    getLibsBooksFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })

}

const getLibsUsers = (req, res) => {
    const id = req.params.id;
    getLibsUsersFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

const deleteUserFromLibrary = (req, res) => {
    const data = req.body;
    deleteUserFromLibraryFunc(data, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Library not found"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

const removeLib = (req, res) => {
    const id = req.params.id;
    removeLibF(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Kütüphane Silinemedi"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

module.exports = {
    getAllLibraries,
    getLibrary,
    registerLibrary,
    getAllRegistered,
    createLibrary,
    getAdminLibrary,
    updateLib,
    getNearestLibrary,
    getLibsBooks,
    getLibsUsers,
    deleteUserFromLibrary,
    removeLib
}
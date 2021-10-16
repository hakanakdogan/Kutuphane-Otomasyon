const { giveDepositFunc, takeBackDepositFunc, getUsersDepositedBooksFunc, getLibrariesDepositsF } = require("./depositService");

const giveDeposit = (req, res) => {
    const data = req.body;
    giveDepositFunc(data, (err, results) => {
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

const takeBackDeposit = (req, res) => {
    const data = req.body;
    takeBackDepositFunc(data, (err, results) => {
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

const getUsersDepositedBooks = (req, res) => {
    const id = req.params.id;
    getUsersDepositedBooksFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Emanet bulunamadı!"
            })
        }
        console.log(results)
        return res.json({
            success: 1,
            data: results
        })
    })
}

const getLibrariesDeposits = (req, res) => {
    const id = req.params.id;
    getLibrariesDepositsF(id, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Emanet Yok"
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
    giveDeposit,
    takeBackDeposit,
    getUsersDepositedBooks,
    getLibrariesDeposits
}
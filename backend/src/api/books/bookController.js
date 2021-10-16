const { addBookFunc, deleteBookFunc } = require("./bookService");

const addBook = (req, res) => {
    const data = req.body;
    addBookFunc(data, (err, results) => {
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
    })
}

const deleteBook = (req, res) => {
    const data = req.body

    deleteBookFunc(data, (err, results) => {
        if (err) {

            return res.status(500).json({
                success: 0,
                message: err.message
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    })

}

module.exports = {
    addBook,
    deleteBook
}
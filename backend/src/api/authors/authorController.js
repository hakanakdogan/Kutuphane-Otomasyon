
const { registerAuthorFunc, deleteAuthorFunc, allAuthorsFunc } = require("./authorService");

const registerAuthor = (req, res) => {
    const data = req.body;
    registerAuthorFunc(data, (err, results) => {
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
const deleteAuthor = (req, res) => {
    const id = req.params.id;
    deleteAuthorFunc(id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Bir Hata Oluştu"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    })
}

const allAuthors = (req, res) => {
    allAuthorsFunc( (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Bir Hata Oluştu"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    })
}

module.exports = {
    registerAuthor,
    deleteAuthor,
    allAuthors
}
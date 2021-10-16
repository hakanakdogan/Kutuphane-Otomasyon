const { addCategoryFunc, deleteCategoryFunc, getAllCategoriesFunc } = require("./categoryService");



const addCategory = (req, res) => {
    const data = req.body;
    addCategoryFunc(data, (err, results) => {
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


const deleteCategory = (req, res) => {
    const id = req.params.id;
    deleteCategoryFunc(id, (err, results) => {
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
const getAllCategories = (req, res) => {
    getAllCategoriesFunc((err, results) => {
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

module.exports = {
    addCategory,
    deleteCategory,
    getAllCategories
}
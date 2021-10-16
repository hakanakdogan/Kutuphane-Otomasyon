const router = require("express").Router();

const { addCategory, deleteCategory, getAllCategories } = require("./categoryController");

router.post("/add-category", addCategory)
router.get("/delete-category/:id", deleteCategory)
router.get("/get-all-categories", getAllCategories)


module.exports = router;
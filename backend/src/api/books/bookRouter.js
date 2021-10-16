const router = require("express").Router();
const { checkJwt } = require("../../middlewares/auth");
const { addBook, deleteBook } = require("./bookController");



router.post("/addBook", addBook);
router.post("/deleteBook", deleteBook);


module.exports = router;

const router = require("express").Router();
const { checkJwt } = require("../../middlewares/auth");
const { registerAuthor, deleteAuthor, allAuthors } = require("./authorController")

router.get("/all-authors", allAuthors);
router.post("/registerAuthor", registerAuthor);
router.get("/deleteAuthor/:id", deleteAuthor);

module.exports = router;
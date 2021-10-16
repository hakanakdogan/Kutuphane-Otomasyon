const router = require("express").Router();

const { giveDeposit, takeBackDeposit, getUsersDepositedBooks, getLibrariesDeposits } = require("./depositController")

router.post("/givedeposit", giveDeposit);
router.post("/takebackdeposit", takeBackDeposit);
router.get("/getUsersDepositedBooks/:id", getUsersDepositedBooks);
router.get("/getLibrariesDeposits/:id", getLibrariesDeposits);

module.exports = router;

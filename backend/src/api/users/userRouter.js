const router = require("express").Router();
const { createUser, getUserById, login, updateUser, getAllUsers, registerUserToLib, removeUserFromLib, loginG, logOut } = require("./userController");
const { checkJwt } = require("../../middlewares/auth");

router.get("/login", loginG);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/get-all-users", getAllUsers);
router.post("/register", createUser);
router.get("/:id", getUserById);


router.post("/update", updateUser);
router.post("/registertolib/:uyeID/:kutuphaneID", registerUserToLib)
router.post("/removefromLib", removeUserFromLib)



module.exports = router;
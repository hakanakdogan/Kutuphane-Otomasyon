const router = require("express").Router();
const { checkJwt } = require("../../middlewares/auth");
const { getAllLibraries, getLibrary, registerLibrary, getAllRegistered, createLibrary, getAdminLibrary, updateLib, getNearestLibrary, getLibsBooks, getLibsUsers, deleteUserFromLibrary, removeLib } = require("./libraryController");

router.post("/createLibrary", createLibrary);
router.get("/all-libraries", getAllLibraries);
router.get("/:id", getLibrary);
router.post("/registerLib/:libID/:userID", registerLibrary);
router.get("/getAllRegisterLib/:userID", getAllRegistered);
router.get("/admin-library/:adminId", getAdminLibrary);
router.post("/update", updateLib);
router.get("/get-nearest-library/:userId", getNearestLibrary);
router.get("/getLibsBooks/:id", getLibsBooks);
router.get("/getLibsUsers/:id", getLibsUsers);
router.post("/deleteUserFromLib", deleteUserFromLibrary);
router.get("/removeLib/:id", removeLib);
module.exports = router;
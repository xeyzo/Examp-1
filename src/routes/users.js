const express = require("express");
const router = express.Router();


const UsersController = require("../controllers/UserController");


router.get("/", UsersController.read);
router.post("/", UsersController.create);

router.get("/:id", UsersController.find);
router.patch("/:id", UsersController.update);

router.delete("/:id", UsersController.delete);

module.exports = router;
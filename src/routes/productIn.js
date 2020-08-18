const express = require("express");
const router = express.Router();


const ProductsInController = require("../controllers/ProductInController");


router.get("/", ProductsInController.read);
router.post("/", ProductsInController.create);

router.get("/:id", ProductsInController.find);
router.patch("/:id", ProductsInController.update);

router.delete("/:id", ProductsInController.delete);

module.exports = router;
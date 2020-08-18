const express = require("express");
const router = express.Router();


const ProductsOutController = require("../controllers/ProductOutController");


router.get("/", ProductsOutController.read);
router.post("/", ProductsOutController.create);

router.get("/:id", ProductsOutController.find);
router.patch("/:id", ProductsOutController.update);

router.delete("/:id", ProductsOutController.delete);

module.exports = router;
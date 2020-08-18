const express = require("express");
const router = express.Router();


const ProductsController = require("../controllers/ProductController");


router.get("/", ProductsController.read);
router.post("/", ProductsController.create);

router.get("/:id", ProductsController.find);
router.patch("/:id", ProductsController.update);

router.delete("/:id", ProductsController.delete);

module.exports = router;
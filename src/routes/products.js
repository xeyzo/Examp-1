const express = require("express");
const router = express.Router();


const ProductsController = require("../controllers/ProductController");


router.post("/", ProductsController.save);
router.patch("/:id", ProductsController.update);
router.get("/", ProductsController.read);
router.get("/:id", ProductsController.find);
router.delete("/:id", ProductsController.delete);

module.exports = router;
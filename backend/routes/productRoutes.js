const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.patch("/:id/stock", updateStock);

router.delete("/:id", deleteProduct);

module.exports = router;
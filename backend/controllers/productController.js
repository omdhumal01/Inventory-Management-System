const pool = require("../db");
const { getIO } = require("../socket/socket");
const { createReorder } = require("../services/reorderService");
// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// POST /api/products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      available_quantity,
      low_stock_threshold,
      cost_price,
      supplier_name,
    } = req.body;

    // Validation
    if (
      !name ||
      !sku ||
      available_quantity === undefined ||
      low_stock_threshold === undefined ||
      cost_price === undefined ||
      !supplier_name
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO products
      (name, sku, available_quantity, low_stock_threshold, cost_price, supplier_name)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        name,
        sku,
        available_quantity,
        low_stock_threshold,
        cost_price,
        supplier_name,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    // Duplicate SKU
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      sku,
      low_stock_threshold,
      cost_price,
      supplier_name,
    } = req.body;

    // Check if product exists
    const product = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET
         name = $1,
         sku = $2,
         low_stock_threshold = $3,
         cost_price = $4,
         supplier_name = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        sku,
        low_stock_threshold,
        cost_price,
        supplier_name,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// PATCH /api/products/:id/stock
const updateStock = async (req, res) => {

  try {

    const { id } = req.params;
    const { available_quantity } = req.body;

    const product = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET available_quantity=$1
       WHERE id=$2
       RETURNING *`,
      [available_quantity, id]
    );

    const updatedProduct = result.rows[0];

    // Low Stock Detection
  let lowStock =
  updatedProduct.available_quantity <
  updatedProduct.low_stock_threshold;

   if (
  updatedProduct.available_quantity <
  updatedProduct.low_stock_threshold
) {

  // Create reorder
  await createReorder(updatedProduct);


  // Send real-time notification
  const io = getIO();


  io.emit(
    "low_stock_alert",
    {
      message: `${updatedProduct.name} is low in stock`,
      product: updatedProduct
    }
  );


}

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      lowStock,
      data: updatedProduct,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
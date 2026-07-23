const pool = require("../db");


const APPROVAL_LIMIT = 100000;


const createReorder = async (product) => {

  try {

    // Check if a reorder already exists
    const existing = await pool.query(
      `SELECT * FROM reorders
       WHERE product_id = $1
       AND status IN ('Processing', 'Pending Approval')`,
      [product.id]
    );


    if (existing.rows.length > 0) {
      console.log("⚠️ Reorder already exists");
      return;
    }



    const quantityOrdered =
      product.low_stock_threshold * 2;



    const totalValue =
      quantityOrdered * product.cost_price;



    let status = "Processing";
    let otp = null;



    // High value reorder approval
    if (totalValue > APPROVAL_LIMIT) {

      status = "Pending Approval";


      otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    }



    // Create reorder in database
    const result = await pool.query(

      `INSERT INTO reorders
      (
        product_id,
        quantity_ordered,
        supplier_name,
        total_value,
        status,
        otp
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,

      [
        product.id,
        quantityOrdered,
        product.supplier_name,
        totalValue,
        status,
        otp
      ]

    );



    const reorder = result.rows[0];



    



    console.log(
      "✅ Reorder Created:",
      reorder.id
    );



    return reorder;



  } catch (error) {


    console.log(
      "❌ Reorder Error:",
      error.message
    );


  }

};



module.exports = {
  createReorder
};
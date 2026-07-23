const pool = require("../db");

// GET ALL REORDERS
const getAllReorders = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                r.*,
                p.name AS product_name,
                p.sku
             FROM reorders r
             JOIN products p
             ON r.product_id = p.id
             ORDER BY r.created_at DESC`
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// GET REORDER BY ID
const getReorderById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                r.*,
                p.name AS product_name,
                p.sku
             FROM reorders r
             JOIN products p
             ON r.product_id = p.id
             WHERE r.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Reorder not found"
            });

        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// APPROVE REORDER
const approveReorder = async (req, res) => {

  try {

    const { id } = req.params;
    const { otp } = req.body;


    // Find reorder
    const reorder = await pool.query(
      "SELECT * FROM reorders WHERE id=$1",
      [id]
    );


    if (reorder.rows.length === 0) {

      return res.status(404).json({
        success:false,
        message:"Reorder not found"
      });

    }


    const reorderData = reorder.rows[0];


    // Check status

    if(reorderData.status !== "Pending Approval"){

      return res.status(400).json({
        success:false,
        message:"Reorder does not require approval"
      });

    }



    // Verify OTP

    if(reorderData.otp !== otp){

      return res.status(400).json({
        success:false,
        message:"Invalid OTP"
      });

    }



    // Update status

    const result = await pool.query(

      `UPDATE reorders
       SET status='Approved',
           otp=NULL
       WHERE id=$1
       RETURNING *`,

      [id]

    );



    res.status(200).json({

      success:true,
      message:"Reorder approved successfully",
      data:result.rows[0]

    });



  } catch(error){

    console.log(error.message);

    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });

  }

};
// CREATE REORDER MANUALLY
const createManualReorder = async (req, res) => {
  try {

    const {
      product_id,
      quantity_ordered
    } = req.body;


    // Get product details
    const product = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [product_id]
    );


    if(product.rows.length === 0){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      });
    }


    const productData = product.rows[0];


    const totalValue =
      quantity_ordered * productData.cost_price;


    let status = "Processing";
    let otp = null;


    const APPROVAL_LIMIT = 100000;


    if(totalValue > APPROVAL_LIMIT){

      status = "Pending Approval";

      otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    }



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
        product_id,
        quantity_ordered,
        productData.supplier_name,
        totalValue,
        status,
        otp
      ]
    );



    res.status(201).json({

      success:true,
      message:"Reorder created successfully",
      data:result.rows[0]

    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

module.exports = {

 getAllReorders,
 getReorderById,
 approveReorder,
 createManualReorder

};
const express = require("express");

const router = express.Router();

const {
    getAllReorders,
    getReorderById,
    approveReorder,
    createManualReorder
} = require("../controllers/reorderController");


// Get all reorders
router.get("/", getAllReorders);


// Create manual reorder
router.post("/", createManualReorder);


// Get reorder by id
router.get("/:id", getReorderById);


// Approve reorder using OTP
router.patch("/:id/approve", approveReorder);


module.exports = router;
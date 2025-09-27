const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

/**
 * Home page - shows products and allows filter by supplier + search
 */
router.get("/", async(req, res) => {
    const { supplier, q } = req.query;
    let filter = {};
    if (supplier) filter.supplier = supplier;
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter).populate("supplier");
    const suppliers = await Supplier.find();
    res.render("index", { products, suppliers, q: q || "", selectedSupplier: supplier || "" });
});

module.exports = router;
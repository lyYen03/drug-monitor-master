const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

exports.index = async(req, res) => {
    const products = await Product.find().populate("supplier");
    res.render("products/index", { products });
};

exports.createForm = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render("products/form", { product: null, suppliers });
};

exports.create = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.create({
        name,
        price: Number(price || 0),
        quantity: Number(quantity || 0),
        supplier: supplier || null
    });
    res.redirect("/products");
};

exports.editForm = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render("products/form", { product, suppliers });
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        price: Number(price || 0),
        quantity: Number(quantity || 0),
        supplier: supplier || null
    });
    res.redirect("/products");
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
};
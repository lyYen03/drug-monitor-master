const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", isAuthenticated, productController.index);

/**
 * @swagger
 * /products/create:
 *   get:
 *     summary: Show create product form (HTML page)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Render create product form
 */
router.get("/create", isAuthenticated, productController.createForm);

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/create", isAuthenticated, productController.create);

/**
 * @swagger
 * /products/{id}/edit:
 *   get:
 *     summary: Show edit product form (HTML page)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Render edit product form
 */
router.get("/:id/edit", isAuthenticated, productController.editForm);

/**
 * @swagger
 * /products/{id}/edit:
 *   post:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 */
router.post("/:id/edit", isAuthenticated, productController.update);

/**
 * @swagger
 * /products/{id}/delete:
 *   get:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.get("/:id/delete", isAuthenticated, productController.delete);

module.exports = router;
const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const { isAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier management
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of suppliers
 */
router.get("/", isAuthenticated, supplierController.index);

/**
 * @swagger
 * /suppliers/create:
 *   get:
 *     summary: Show create supplier form (HTML page)
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Render create supplier form
 */
router.get("/create", isAuthenticated, supplierController.createForm);

/**
 * @swagger
 * /suppliers/create:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supplier created
 */
router.post("/create", isAuthenticated, supplierController.create);

/**
 * @swagger
 * /suppliers/{id}/edit:
 *   get:
 *     summary: Show edit supplier form (HTML page)
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Render edit supplier form
 */
router.get("/:id/edit", isAuthenticated, supplierController.editForm);

/**
 * @swagger
 * /suppliers/{id}/edit:
 *   post:
 *     summary: Update supplier by ID
 *     tags: [Suppliers]
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
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated
 */
router.post("/:id/edit", isAuthenticated, supplierController.update);

/**
 * @swagger
 * /suppliers/{id}/delete:
 *   get:
 *     summary: Delete supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Supplier deleted
 */
router.get("/:id/delete", isAuthenticated, supplierController.delete);

module.exports = router;
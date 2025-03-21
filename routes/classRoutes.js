const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing classes
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of classes
 *       500:
 *         description: Server error
 */
router.get('/', classController.getAllClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class data
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.get('/:id', classController.getClassById);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class if there's at least one missionary available
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created
 *       400:
 *         description: Cannot create a class - No missionaries available
 */
router.post('/', classController.createClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update a class by ID if there's at least one missionary available
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated
 *       404:
 *         description: Class not found
 *       400:
 *         description: Cannot update a class - No missionaries available
 */
router.put('/:id', classController.updateClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', classController.deleteClass);

module.exports = router;
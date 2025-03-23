const express = require('express');
const router = express.Router();
const missionaryController = require('../controllers/missionaryController');

/**
 * @swagger
 * tags:
 *   name: Missionaries
 *   description: API for managing missionaries
 */

/**
 * @swagger
 * /api/missionaries:
 *   get:
 *     summary: Get all missionaries
 *     tags: [Missionaries]
 *     responses:
 *       200:
 *         description: List of missionaries
 *         content:
 *           aplication/json:
 *             schema:
 *               $ref: "#components/schemas/MissionaryResponse"
 *       500:
 *         description: Server error
 */
router.get('/', missionaryController.getAllMissionaries);

/**
 * @swagger
 * /api/missionaries/{id}:
 *   get:
 *     summary: Get a missionary by ID
 *     tags: [Missionaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Missionary data
 *       404:
 *         description: Missionary not found
 *       500:
 *         description: Server error
 */
router.get('/:id', missionaryController.getMissionaryById);

/**
 * @swagger
 * /api/missionaries:
 *   post:
 *     summary: Create a new missionary
 *     tags: [Missionaries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Missionary'
 *     responses:
 *       201:
 *         description: Missionary created
 *       400:
 *         description: Invalid input
 */
router.post('/', missionaryController.createMissionary);

/**
 * @swagger
 * /api/missionaries/{id}:
 *   put:
 *     summary: Update a missionary by ID
 *     tags: [Missionaries]
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
 *             $ref: '#/components/schemas/Missionary'
 *     responses:
 *       200:
 *         description: Missionary updated
 *       400:
 *         description: Invalid input or _id field provided (ignored)
 *       404:
 *         description: Missionary not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', missionaryController.updateMissionary);

/**
 * @swagger
 * /api/missionaries/{id}:
 *   delete:
 *     summary: Delete a missionary by ID if he's not assigned to any class
 *     tags: [Missionaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Missionary deleted
 *       400:
 *         description: Cannot delete an assigned missionary
 *       404:
 *         description: Missionary not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', missionaryController.deleteMissionary);

module.exports = router;
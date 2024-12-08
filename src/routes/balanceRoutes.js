import express from "express";
import { getBalance } from "../controllers/transactionController.js";
import authenticate from "../middleware/authenticate.js"; // Middleware untuk otentikasi

const router = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get user balance
 *     security:
 *       - Bearer: []  # Menambahkan Bearer token di sini
 *     responses:
 *       200:
 *         description: User's balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       401:
 *         description: Unauthorized (Invalid token)
 *       500:
 *         description: Server error
 */
router.get("/balance", authenticate, getBalance);

export default router;

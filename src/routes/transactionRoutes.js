import express from "express";
import { pay, getTransactions } from "../controllers/transactionController.js";
import authenticate from "../middleware/authenticate.js"; // Ensure this is implemented for protecting routes

const router = express.Router();

/**
 * @swagger
 * /transaction/pay:
 *   post:
 *     summary: Pay for a service
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment successful
 *       400:
 *         description: Insufficient balance
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized (Invalid token)
 *       500:
 *         description: Server error
 */
router.post("/pay", authenticate, pay);

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     summary: Get the transaction history of the logged-in user
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       type:
 *                         type: string
 *                       service_name:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized (Invalid token)
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Server error
 */
router.get("/history", authenticate, getTransactions);

export default router;

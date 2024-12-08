import jwt from "jsonwebtoken";
import db from "../config/db.js";

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
export const getBalance = (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  // Hapus "Bearer " dari token jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id; // Ambil userId dari token JWT

    const sql = "SELECT balance FROM users WHERE id = ?";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ balance: result[0].balance });
    });
  });
};

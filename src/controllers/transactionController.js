import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Fungsi untuk melakukan pembayaran
export const pay = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  // Hapus "Bearer " dari token jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.id; // ID pengguna dari token JWT
      const { service_name, amount } = req.body; // Mengambil service_name dan amount dari body request

      try {
        // Ambil saldo pengguna
        const [rows] = await db.query(
          "SELECT balance FROM users WHERE id = ?",
          [userId]
        );

        if (rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const balance = parseFloat(rows[0].balance);

        // Periksa apakah saldo mencukupi
        if (balance < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        // Kurangi saldo pengguna
        await db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
          amount,
          userId,
        ]);

        // Kirim response sukses tanpa mencatat transaksi
        res.json({ message: `Payment for ${service_name} successful` });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
};

// Fungsi untuk mengambil histori transaksi pengguna
export const getTransactions = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  // Hapus "Bearer " dari token jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.id; // ID pengguna dari token JWT

      try {
        // Ambil histori transaksi pengguna
        const [transactions] = await db.query(
          "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
          [userId]
        );

        if (transactions.length === 0) {
          return res.status(404).json({ message: "No transactions found" });
        }

        res.json({ transactions });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
};

// Fungsi untuk mendapatkan saldo pengguna
export const getBalance = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  // Hapus "Bearer " dari token jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.id; // ID pengguna dari token JWT

      try {
        // Ambil saldo pengguna
        const [rows] = await db.query(
          "SELECT balance FROM users WHERE id = ?",
          [userId]
        );

        if (rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({ balance: rows[0].balance });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
};

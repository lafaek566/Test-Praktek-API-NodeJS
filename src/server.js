import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import balanceRoutes from "./routes/balanceRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { swaggerDocs } from "./swagger.js"; // Swagger integration

// Load environment variables
dotenv.config();

const app = express();

// Use Swagger UI for documentation
swaggerDocs(app);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/balance", balanceRoutes);
app.use("/transaction", transactionRoutes);

// Set port from environment variables, default to 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

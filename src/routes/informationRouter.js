import express from "express";
import {
  getBanners,
  getServices,
} from "../controllers/informationController.js";

const router = express.Router();

/**
 * @swagger
 * /information/banner:
 *   get:
 *     summary: Get all banners
 *     responses:
 *       200:
 *         description: A list of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 banners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image_url:
 *                         type: string
 *       404:
 *         description: No banners found
 *       500:
 *         description: Server error
 */
router.get("/banner", getBanners);

/**
 * @swagger
 * /information/services:
 *   get:
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *       404:
 *         description: No services found
 *       500:
 *         description: Server error
 */
router.get("/services", getServices);

export default router;

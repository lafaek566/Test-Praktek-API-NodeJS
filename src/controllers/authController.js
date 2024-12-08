import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // Use the pool from the database config
import multer from "multer";
import path from "path";

// Regular expression to validate email format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the folder to store the images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Rename file with timestamp to avoid name conflicts
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."), false);
    }
  },
}).single("image"); // 'image' is the key name for the file in the form

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register.
 *     operationId: registerUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({
      status: "error",
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashPassword]
    );

    // Create a JWT token with email and 12 hours expiration time
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "12h", // 12 hours expiration
    });

    // Add default image URL or the image URL provided during registration
    const imageUrl = "https://example.com/path/to/your/image.jpg";

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      imageUrl, // Include image URL in response
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: This endpoint allows a user to login.
 *     operationId: loginUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 imageUrl:  # Adding image URL to response
 *                   type: string
 *                   description: URL to the user's profile image
 *       400:
 *         description: Invalid credentials or email format
 *       500:
 *         description: Internal server error
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: "error",
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    const imageUrl = user.imageUrl || "https://example.com/default-image.jpg";

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      imageUrl,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get the user's profile
 *     description: This endpoint returns the user's profile details.
 *     operationId: getProfile
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                   description: URL to the user's profile image
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const getProfile = async (req, res) => {
  const { email } = req.user; // Assuming JWT token is already decoded

  try {
    const [users] = await pool.query(
      "SELECT username, email, imageUrl FROM users WHERE email = ?",
      [email]
    );
    const user = users[0];

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl || "https://example.com/default-image.jpg",
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @swagger
 * /auth/profile/update:
 *   put:
 *     summary: Update the user's profile
 *     description: This endpoint allows a user to update their profile, including uploading a new profile image.
 *     operationId: updateProfile
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const updateProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    const { username, email } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const [result] = await pool.query(
        "UPDATE users SET username = ?, imageUrl = ? WHERE email = ?",
        [username, imageUrl, email]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  });
};

/**
 * @swagger
 * /auth/profile/image:
 *   get:
 *     summary: Get the user's profile image
 *     description: This endpoint returns the URL of the user's profile image.
 *     operationId: getProfileImage
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Profile image fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
export const getProfileImage = async (req, res) => {
  const { email } = req.user; // Assuming JWT token is already decoded

  try {
    const [users] = await pool.query(
      "SELECT imageUrl FROM users WHERE email = ?",
      [email]
    );
    const user = users[0];

    if (!user || !user.imageUrl) {
      return res.status(404).json({
        status: "error",
        message: "Image not found",
      });
    }

    res.status(200).json({
      status: "success",
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

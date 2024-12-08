import db from "../config/db.js";

// Fungsi untuk mengambil semua banner
export const getBanners = async (req, res) => {
  try {
    const [banners] = await db.query("SELECT * FROM banners ORDER BY id ASC");

    if (banners.length === 0) {
      return res.status(404).json({ message: "No banners found" });
    }

    res.json({ banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengambil semua layanan
export const getServices = async (req, res) => {
  try {
    const [services] = await db.query("SELECT * FROM services ORDER BY id ASC");

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.json({ services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import express from "express";
import {
  createBrand,
  getBrandById,
  deleteBrand,
  updateBrand,
  getBrands,
} from "../controllers/brandControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBrands).post(protect, admin, createBrand);

router
  .route("/:id")
  .get(getBrandById)
  .delete(protect, admin, deleteBrand)
  .put(protect, admin, updateBrand);

export default router;

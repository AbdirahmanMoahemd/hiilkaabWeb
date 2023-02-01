import express from "express";
import {
  getTopCategories,
  getTopCategoryById,
  createTopCategory,
  updateTopCategory,
  deleteTopCategory,
} from "../controllers/topCategriesController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTopCategories).post(protect, admin, createTopCategory);

router
  .route("/:id")
  .get(getTopCategoryById)
  .delete(protect, admin, deleteTopCategory)
  .put(protect, admin, updateTopCategory);

export default router;

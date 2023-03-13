import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories2,
  getCategoriesFooter,
} from "../controllers/categoryController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);
router.route('/all').get(getCategories2)

router.route("/footer").get(getCategoriesFooter)

router
  .route("/:id")
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;

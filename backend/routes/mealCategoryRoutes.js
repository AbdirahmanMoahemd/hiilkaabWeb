import express from "express";
import {
  createMealCategory,
  deleteMealCategor,
  getMealCategories,
  getMealCategoriesById,
  getMealCategoriesByRestaurant,
  updateMealCategory,
} from "../controllers/mealCategoryController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getMealCategories)
  .post(protect, admin, createMealCategory)
  .put(protect, admin, updateMealCategory);
router.route("/byrestaurant/:name").get(getMealCategoriesByRestaurant);
router.route("/:id").get(getMealCategoriesById);
router.route("/delete-mealcategory").post(protect, admin, deleteMealCategor);

export default router;

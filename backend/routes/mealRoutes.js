import express from "express";
import {
  createNewMeal,
  deleteMeal,
  getCoffeeMealByname,
  getDisMeals,
  getMealByCoffee,
  getMealById,
  getMealByResturant,
  getMealBySweets,
  getMeals,
  getMealsByCategory,
  getMealsByStore,
  getMealsByStoreAndDiscount,
  getMealsByStoreAvaible,
  getMealsByStoreUnavaible,
  getRestaurantMealByname,
  getSweetsMealByname,
  updateMeal,
} from "../controllers/mealController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get all meals
router
  .route("/")
  .get(getMeals)
  .post(protect, admin, createNewMeal)
  .put(protect, admin, updateMeal);
router.route("/discounted").get(getDisMeals)
router.route("/:id").get(getMealById);
router.route("/search/:name").get(getRestaurantMealByname)
router.route("/coffee/search/:name").get(getCoffeeMealByname);
router.route("/sweet/search/:name").get(getSweetsMealByname);
router.route("/search").post(getMealByResturant);
router.route("/coffee/search").post(getMealByCoffee);
router.route("/sweets/search").post(getMealBySweets);
router.route("/store").post(getMealsByStore);
router.route("/store/discounted").post(getMealsByStoreAndDiscount);
router.route("/store/avaible").post(getMealsByStoreAvaible);
router.route("/store/unavaible").post(getMealsByStoreUnavaible);
router.route("/bycategory").post(getMealsByCategory);
router.route("/admin/delete-meal").post(protect, admin, deleteMeal);

export default router;

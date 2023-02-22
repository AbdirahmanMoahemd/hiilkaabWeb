import {
  createRestaurants,
  deleteRestaurants,
  getRestaurants,
  getRestaurantsById,
  getRestaurantsByname,
  rateRestaurants,
  updateRestaurants,
} from "../controllers/restaurantController.js";
import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getRestaurants)
  .post(protect, admin, createRestaurants)
  .put(protect, admin, updateRestaurants);

router.route("/:id").get(getRestaurantsById);
router.route("/:name").get(getRestaurantsByname);
router.route("/restaurant/:name").get(getRestaurantsByname);
router.route("/delete-restaurant").post(protect, admin, deleteRestaurants);
router.route("/rate-restaurant").post(protect, rateRestaurants);

export default router;

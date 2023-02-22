import express from "express";
import { createCoffee, deleteCoffee, getCoffee, getCoffeeById, getCoffeeByname, ratingCoffee, updateCoffee } from "../controllers/coffeeControllers.js";
import { protect, admin }  from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/').get(getCoffee).post(protect, admin, createCoffee).put(protect, admin, updateCoffee)
router.route("/:id").get(getCoffeeById);
router.route("/:name").get(getCoffeeByname);
router.route("/delete-coffee").post(protect , admin,deleteCoffee);
router.route("/rate-coffee").post(protect, ratingCoffee);


export default router
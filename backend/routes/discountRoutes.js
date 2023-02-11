import express from "express";
import {
  getDiscounts,
  getDiscountsById,
  createDiscounts,
  updateDiscounts,
  deleteDiscounts,
} from "../controllers/discountController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getDiscounts).post(protect, admin, createDiscounts);

router
  .route("/:id")
  .get(getDiscountsById)
  .delete(protect, admin, deleteDiscounts)
  .put(protect, admin, updateDiscounts);

export default router;

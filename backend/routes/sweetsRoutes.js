import express from "express";
import {
  createSweets,
  deleteSweets,
  getSweets,
  getSweetsById,
  getSweetsByname,
  rateSweets,
  updateSweets,
} from "../controllers/sweetsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getSweets)
  .post(protect, admin, createSweets)
  .put(protect, admin, updateSweets);

router.route("/:id").get(getSweetsById);
router.route("/:name").get(getSweetsByname);
router.route("/delete-sweets").post(protect, admin, deleteSweets);
router.route("/rate-sweets").post(protect, rateSweets);

export default router;

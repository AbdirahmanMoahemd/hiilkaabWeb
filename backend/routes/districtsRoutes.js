import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  addDestinations,
  createDistrict,
  deleteDestinations,
  deleteDistrict,
  getDestinationsBySourceId,
  getDistricts,
  updateDestination,
  updateDistrict,
} from "../controllers/districtsController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getDistricts)
  .post(protect, admin, createDistrict);
router.route("/add-destination/:id").post(protect, admin, addDestinations);
router
  .route("/:id")
  .get(getDestinationsBySourceId)
  .delete(protect, admin, deleteDistrict)
  .put(protect, admin, updateDistrict)
  .post(protect, admin, updateDestination);
router.route("/delete-des/:id").post(protect, admin, deleteDestinations);

export default router;

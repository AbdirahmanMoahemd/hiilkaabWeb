import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createDeliveryOrders, getDeliveryOrders, getDeliveryOrders2, getDeliveryOrdersById, updateDeliveryOrderByStatus } from "../controllers/deliveryController.js";

const router = express.Router();

router
  .route("/")
  .get(protect,admin, getDeliveryOrders)
  .post(createDeliveryOrders);
router.route("/get/app").get(protect, admin, getDeliveryOrders2);
router.route("/update/:id").put(protect, admin, updateDeliveryOrderByStatus);
router
  .route("/:id").get(getDeliveryOrdersById)


  export default router;
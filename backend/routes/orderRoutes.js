import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrdersAll,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid2,
  getRecentOrders,
  addOrderItemsEvc,
  getOrdersByPhone,
  getOrdersByPendding,
  getOrdersByProcess,
  getOrdersByComplete,
  changeOrderStatus,
  getAllOrdersApp,
  addOrderItems2,
  getRecentOrders2,
  getMyOrdersApp,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/app").post(protect, addOrderItems2)
router.route("/app").get(protect, admin, getAllOrdersApp);
router.route("/app/recent-orders").get(protect, admin, getRecentOrders2);
router.route("/app/myorders").get(protect, getMyOrdersApp);
router.get("/count", getMyOrdersAll);
router.route("/phone").post(getOrdersByPhone);
router.route("/evc").post(protect, addOrderItemsEvc);
router.route("/recent").get(protect, admin, getRecentOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/app/pindding").get(protect, getOrdersByPendding);
router.route("/app/process").get(protect, getOrdersByProcess);
router.route("/app/complete").get(protect, getOrdersByComplete);
router.route("/change-order-status").put(protect, admin, changeOrderStatus);
router
  .route("/:id/pay")
  .put(protect, updateOrderToPaid)
  .put(protect, updateOrderToPaid2);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/pay/evc").put(protect, updateOrderToPaid2);

export default router;

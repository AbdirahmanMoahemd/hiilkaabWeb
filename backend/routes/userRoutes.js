import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  getUsersCount,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.get("/count", getUsersCount);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);

router.route("/profile/password").put(protect, updateUserPassword);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;

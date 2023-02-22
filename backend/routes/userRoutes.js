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
  authUser2,
  saveUserAddress,
  forgottUserPassword,
  registerUser2,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/register", registerUser2);
router.get("/count", getUsersCount);
router.post("/login", authUser);
router.post("/app/login", authUser2);

router.route('/save-user-address').put(protect, saveUserAddress)
router.route('/update/forgot/email').post(forgottUserPassword)
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

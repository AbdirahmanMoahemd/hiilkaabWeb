import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getDiscProducts,
  getProductsBySubcategory,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductsByTopCategory1,
  getProductsByTopCategory2,
  getProductsByTopCategory3,
  getProductsByTopCategory4,
  getProductsCount,
  getTopProducts,
  getProductsLowPriceToHight,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/dis", ).get(getDiscProducts);
router.route("/top", ).get(getTopProducts);
router.route("/price").get(getProductsLowPriceToHight);
router.route("/category1", ).post(getProductsByTopCategory1);
router.route('/count').get(getProductsCount); 
router.route("/category2", ).post(getProductsByTopCategory2);
router.route("/category3", ).post(getProductsByTopCategory3);
router.route("/category4", ).post(getProductsByTopCategory4);
router.route("/search/sub", ).get(getProductsBySubcategory);
router.route("/search/cat", ).get(getProductsByCategory);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct) 
  .put(protect, admin, updateProduct); 

export default router;

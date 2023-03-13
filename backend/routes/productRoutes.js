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
  getProductsByHightToLowProducts,
  getProductsByLowToHightProducts,
  getDiscountedProductsByCat,
  getDiscountedProducts,
  getProductsBySubCategory2,
  getProductsByCategory2,
  createProductReviewApp,
  getProductsByname,
  getProducts2,
  getTopProducts2,
  getSameProductById,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route('/all').get(getProducts2)
router.route("/dis", ).get(getDiscProducts);
router.route("/top", ).get(getTopProducts);
router.route("/app/top", ).get(getTopProducts2);
router.route("/price").get(getProductsLowPriceToHight);
router.route("/category1", ).post(getProductsByTopCategory1);
router.route('/count').get(getProductsCount); 
router.route("/search/:name").get(getProductsByname);
router.route("/category2", ).post(getProductsByTopCategory2);
router.route("/category3", ).post(getProductsByTopCategory3);
router.route("/category4", ).post(getProductsByTopCategory4);
router.route("/search/sub", ).get(getProductsBySubcategory);
router.route("/search/cat", ).get(getProductsByCategory);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id/reviews/app").post(protect, createProductReviewApp);

router.route("/search/cat2").post(getProductsByCategory2);
router.route("/search/subcat2").post(getProductsBySubCategory2);


router.route("/discounted").get(getDiscountedProducts);
router.route("/discounted/cat").post(getDiscountedProductsByCat);
router.route("/highttolow").post(getProductsByHightToLowProducts);
router.route("/lowtohight").post(getProductsByLowToHightProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct) 
  .put(protect, admin, updateProduct); 
router
  .route("/same/:id").get(getSameProductById)

export default router;

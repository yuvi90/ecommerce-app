import express from "express";
import { authenticate, adminOnly } from "../middlewares/auth.js";
import ProductController from "../controllers/product.js";
import { multipleUploads } from "../middlewares/multer.js";

const router = express.Router();

//To Create New Product  - /api/product/new
router.post("/new", authenticate, adminOnly, multipleUploads, ProductController.newProduct);

//To get last 10 Products  - /api/product/latest
router.get("/latest", ProductController.getlatestProducts);

//To get all Products with filters  - /api/product/all
router.get("/all", ProductController.getAllProducts);

//To get all unique Categories  - /api/product/categories
router.get("/categories", ProductController.getAllCategories);

//To get all Products   - /api/product/admin-products
router.get("/admin-products", authenticate, adminOnly, ProductController.getAdminProducts);

// To get, update, delete Product
router
  .route("/:id")
  .get(ProductController.getSingleProduct)
  .put(authenticate, adminOnly, multipleUploads, ProductController.updateProduct)
  .delete(authenticate, adminOnly, ProductController.deleteProduct);

export default router;

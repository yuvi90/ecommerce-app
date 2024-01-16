import express from "express";
import { authenticate, adminOnly } from "../middlewares/auth.js";
import ProductController from "../controllers/product.js";
import { multipleUploads } from "../middlewares/multer.js";

const app = express.Router();

//To Create New Product  - /api/product/new
app.post("/new", authenticate, adminOnly, multipleUploads, ProductController.newProduct);

//To get last 10 Products  - /api/product/latest
app.get("/latest", ProductController.getlatestProducts);

//To get all Products with filters  - /api/product/all
app.get("/all", ProductController.getAllProducts);

//To get all unique Categories  - /api/product/categories
app.get("/categories", ProductController.getAllCategories);

//To get all Products   - /api/product/admin-products
app.get("/admin-products", authenticate, adminOnly, ProductController.getAdminProducts);

// To get, update, delete Product
app
  .route("/:id")
  .get(ProductController.getSingleProduct)
  .put(authenticate, adminOnly, multipleUploads, ProductController.updateProduct)
  .delete(authenticate, adminOnly, ProductController.deleteProduct);

export default app;

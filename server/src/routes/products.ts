import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//To Create New Product  - /api/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//To get all Products with filters  - /api/product/all
app.get("/all", getAllProducts);

//To get last 10 Products  - /api/product/latest
app.get("/latest", getlatestProducts);

//To get all unique Categories  - /api/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

// To get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;

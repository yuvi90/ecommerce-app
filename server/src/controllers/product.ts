import { Request, Response, NextFunction } from "express";
import { promises as fsPromises } from "fs";
// Importing Locals
import config from "../config/index.js";
import { IProduct, Product } from "../models/product.js";
import { cache } from "../app.js";
import { invalidateCache } from "../utils/helpers.js";

// Types
import { BaseQuery, SearchRequestQuery } from "../types/types.js";
interface NewProductRequestBody<T> extends Request {
  body: T;
}

// Status Messages
const statusMessages = {
  photosRequired: "Please add photos of the product",
  fieldsRequired: "Please enter all fields",
  productCreated: "Product Created Successfully",
  productUpdated: "Product Updated Successfully",
  somethingWentWrong: "Something went wrong!",
};

const ProductController = {
  /**
   *
   * Create new product
   *
   */
  newProduct: async (req: NewProductRequestBody<IProduct>, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, stock, category } = req.body;
      const photos = req.files;

      if (!photos) {
        return res.status(400).json({
          status: false,
          message: statusMessages.photosRequired,
        });
      }

      if (!name || !description || !price || !stock || !category) {
        // Delete all uploaded photos
        if (Array.isArray(photos) && photos.length > 0) {
          await Promise.all(photos?.map((photo) => fsPromises.unlink(photo.path)) || []).catch(
            () => {
              throw new Error("Error in deleting photos !");
            },
          );
        }

        return res.status(400).json({
          status: false,
          message: statusMessages.fieldsRequired,
        });
      }

      const newProduct: IProduct = {
        name,
        description,
        price,
        stock,
        category: category.toLowerCase(),
      };

      // Check if photos are uploaded
      const photoFiles: string[] = [];
      if (Array.isArray(photos) && photos.length > 0) {
        photos.forEach((file) => photoFiles.push(file.path));
      }
      // Set photos and thumbnails
      if (photoFiles.length > 0) {
        newProduct.thumbnail = photoFiles[0];
        newProduct.photos = photoFiles;
      }

      const result = await Product.create(newProduct);
      if (result) {
        invalidateCache({ product: true, admin: true });

        return res.status(201).json({
          status: true,
          message: statusMessages.productCreated,
        });
      } else {
        throw new Error(statusMessages.somethingWentWrong);
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Update Product
   *
   */
  updateProduct: async (
    req: NewProductRequestBody<Partial<IProduct>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category, thumbnail, photos } = req.body;
      const newPhotos = req.files;

      const product = await Product.findById(id);

      if (!product) {
        if (Array.isArray(newPhotos) && newPhotos.length > 0) {
          await Promise.all(newPhotos?.map((photo) => fsPromises.unlink(photo.path)) || []).catch(
            () => {
              throw new Error("Error in deleting photos !");
            },
          );
        }

        return res.status(404).json({
          status: false,
          message: "Product Not Found",
        });
      }

      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      if (category) product.category = category;
      if (thumbnail) product.thumbnail = thumbnail;

      if (photos && Array.isArray(photos)) {
        // Delete old photos
        const photosToDelete = product.photos?.filter((photo) => !photos.includes(photo));
        await Promise.all(photosToDelete?.map((photo) => fsPromises.unlink(photo)) || []).catch(
          () => {
            throw new Error("Error in deleting photos !");
          },
        );
        product.photos = photos;

        // Check if new photos are uploaded
        if (Array.isArray(newPhotos) && newPhotos.length > 0) {
          newPhotos.forEach(async (file) => {
            if (product.photos && product.photos.length < config.maxProductsPhotosLimit) {
              product.photos.push(file.path);
            } else {
              await fsPromises.unlink(file.path).catch(() => {
                throw new Error("Error in deleting excess photos !");
              });
            }
          });
        }
      }

      await product.save().catch(() => {
        throw new Error(statusMessages.somethingWentWrong);
      });

      invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });

      return res.status(204).json({
        status: true,
        message: statusMessages.productUpdated,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Delete Product
   *
   */
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product Not Found",
        });
      }

      if (product.photos && product.photos.length > 0) {
        await Promise.all(product.photos.map((photo) => fsPromises.unlink(photo)) || []).catch(
          () => {
            throw new Error("Error in deleting photos !");
          },
        );
      }

      await product.deleteOne().catch(() => {
        throw new Error(statusMessages.somethingWentWrong);
      });

      invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
      });

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Fetch Latest Products
   *
   */
  getlatestProducts: async (req: Request, res: Response, next: NextFunction) => {
    let products;
    try {
      if (cache.has("latest-products"))
        products = JSON.parse(cache.get("latest-products") as string);
      else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        cache.set("latest-products", JSON.stringify(products));
      }

      return res.status(200).json({
        status: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Fetch Categories
   *
   */
  getAllCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let categories;

      if (cache.has("categories")) categories = JSON.parse(cache.get("categories") as string);
      else {
        categories = await Product.distinct("category");
        cache.set("categories", JSON.stringify(categories));
      }

      return res.status(200).json({
        status: true,
        categories,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Fetch Admin Products
   *
   */
  getAdminProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let products;
      if (cache.has("all-products")) products = JSON.parse(cache.get("all-products") as string);
      else {
        products = await Product.find({});
        cache.set("all-products", JSON.stringify(products));
      }

      return res.status(200).json({
        status: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Fetch Product Details
   *
   */
  getSingleProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let product;
      const id = req.params.id;

      if (cache.has(`product-${id}`)) product = JSON.parse(cache.get(`product-${id}`) as string);
      else {
        product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({
            status: false,
            message: "Product Not Found",
          });
        }

        cache.set(`product-${id}`, JSON.stringify(product));
      }

      return res.status(200).json({
        status: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   *
   * Fetch All Products
   *
   */
  getAllProducts: async (
    req: Request & { query: SearchRequestQuery },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { search, sort, category, price } = req.query;

      const page = Number(req.query.page) || 1;
      const limit = Number(config.maxPhotosOnPage) || 8;
      const skip = (page - 1) * limit;

      const baseQuery: BaseQuery = {};

      if (search)
        baseQuery.name = {
          $regex: search,
          $options: "i",
        };

      if (price)
        baseQuery.price = {
          $lte: Number(price),
        };

      if (category) baseQuery.category = category;

      const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

      const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
      ]);

      const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

      return res.status(200).json({
        status: true,
        products,
        totalPage,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;

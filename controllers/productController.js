import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../models/productModel.js";
import {
  errorResource,
  productCollection,
  productResource,
} from "../resources/productResource.js";

export const index = async (c) => {
  try {
    const products = await getAllProducts();
    return c.json(productCollection(products), 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
};

export const show = async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const product = await getProductById(id);

    if (!product) {
      return c.json(errorResource("Product not found"), 404);
    }

    return c.json(productResource(product), 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch product" }, 500);
  }
};

export const store = async (c) => {
  try {
    const body = await c.req.json();

    if (!body.name || !body.price) {
      return c.json({ error: "Name and price are required" }, 400);
    }

    const product = await createProduct(body);
    return c.json(productResource(product), 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create product" }, 500);
  }
};

export const update = async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();

    if (!body.name || !body.price) {
      return c.json({ error: "Name and price are required" }, 400);
    }

    const product = await updateProduct(id, body);
    if (!product) return c.json(errorResource("Product not found"), 404);

    return c.json(productResource(product), 200);
  } catch (error) {
    console.error(error);
    return c.json(errorResource("Failed to update product"), 500);
  }
};

export const destroy = async (c) => {
  try {
    const id = parseInt(c.req.param("id"));

    // Tambahkan pengecekan apakah produk ada sebelum dihapus
    const product = await getProductById(id);
    if (!product) return c.json(errorResource("Product not found"), 404);

    await deleteProduct(id);
    return c.json({ status: "success", message: "Product deleted" }, 200);
  } catch (error) {
    console.error(error);
    return c.json(errorResource("Failed to delete product"), 500);
  }
};

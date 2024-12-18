import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (productData) => {
  try {
    console.log("Creating product with data:", productData); // Debug log
    const product = await prisma.product.create({
      data: productData,
    });
    return product;
  } catch (error) {
    console.error("Error creating product", error);
    throw new Error("Database error");
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products", error);
    throw new Error("Database error");
  }
};

export const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product", error);
    throw new Error("Database error");
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });
    return product;
  } catch (error) {
    console.error("Error updating product", error);
    throw new Error("Database error");
  }
};

export const deleteProduct = async (id) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product", error);
    throw new Error("Database error");
  }
};

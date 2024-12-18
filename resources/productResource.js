export const productResource = (product) => {
  return {
    status: "success",
    data: {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      createAt: product.createAt.toISOString(),
    },
  };
};

export const productCollection = (products) => {
  return {
    status: "success",
    data: products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      createAt: product.createAt.toISOString(),
    })),
  };
};

export const errorResource = (message) => {
  return {
    status: "error",
    message,
  };
};

import { Hono } from "hono";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/productController.js";

const productRoutes = new Hono();

productRoutes.get("/", index);
productRoutes.get("/:id", show);
productRoutes.post("/", store);
productRoutes.put("/:id", update);
productRoutes.delete("/:id", destroy);

export default productRoutes;

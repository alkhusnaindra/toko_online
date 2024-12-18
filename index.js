import { Hono } from "hono";
import { serve } from "@hono/node-server";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import { cors } from "hono/cors";

dotenv.config();
const app = new Hono();

// Middleware untuk CORS
app.use("*", cors());

// Custom logging middleware
app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

app.route("/products", productRoutes);

// Menjalankan server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});

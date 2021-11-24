import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";

import { createRoles } from "./libs/initialSetup";
import productRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import categorysRoutes from "./routes/categories.routes";
import cartRoutes from "./routes/cart.routes";
import mercadoPagoRoutes from "./routes/mercadoPago.routes";
import initialDataRoutes from "./routes/admin/initialData";

const app = express();

// // Agrega credenciales
// mercadopago.configure({
//     access_token: 'PROD_ACCESS_TOKEN'
// });

createRoles();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("port", config.PORT);
app.use(productRoutes);
app.use(authRoutes);
app.use(categorysRoutes);
app.use(cartRoutes);
app.use(mercadoPagoRoutes);
app.use(initialDataRoutes);

export default app;

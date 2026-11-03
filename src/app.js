import express from "express";
import { fileURLToPath } from "node:url";
import userRoutes from "./routes/client.route.js";
import houseownerRoutes from "./routes/houseowner.route.js";
import contractorRoutes from "./routes/contractor.routes.js";
import systemVendorRoutes from "./routes/systemVendor.routes.js";

import masterAdminRoutes from "./routes/masterAdmin.routes.js"; 

const app = express();
const publicDirectory = fileURLToPath(new URL("../public", import.meta.url));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectory));

app.use("/", userRoutes);
app.use("/houseowner", houseownerRoutes);
app.use("/contractor", contractorRoutes);
app.use("/systemVendor", systemVendorRoutes);

app.use("/masterAdmin",masterAdminRoutes)

export default app;
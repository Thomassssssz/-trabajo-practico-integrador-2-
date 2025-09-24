import { Router } from "express";
import userRoutes from "./user.routes.js";
import articleRoutes from "./article.routes.js";
import tagRoutes from "./tag.routes.js";
import commentRoutes from "./comment.routes.js";
import authRoutes from "./auth.routes.js";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/articles", articleRoutes);
routes.use("/tags", tagRoutes);
routes.use("/comments", commentRoutes);
routes.use("/auth", authRoutes);

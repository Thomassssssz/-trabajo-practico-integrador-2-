import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import { ArticleModel } from "../models/article.model.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.get("/:id/articles", authMiddleware, async (req, res) => {
  try {
    const articles = await ArticleModel.find({ author: req.params.id })
      .populate("tags")
      .populate("author");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;

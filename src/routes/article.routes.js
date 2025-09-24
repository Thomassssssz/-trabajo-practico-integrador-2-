import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/article.controller.js";
import {
  authMiddleware,
  ownerOrAdminMiddleware,
} from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { ArticleModel } from "../models/article.model.js";
import { articleValidation } from "../middlewares/validations/article.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  articleValidation,
  validationMiddleware,
  createArticle
);
router.get("/", authMiddleware, getArticles);
router.get("/:id", authMiddleware, getArticleById);
router.put(
  "/:id",
  authMiddleware,
  ownerOrAdminMiddleware(ArticleModel, "author"),
  articleValidation,
  validationMiddleware,
  updateArticle
);
router.delete(
  "/:id",
  authMiddleware,
  ownerOrAdminMiddleware(ArticleModel, "author"),
  deleteArticle
);

router.post(
  "/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminMiddleware(ArticleModel, "author", "articleId"),
  addTagToArticle
);

router.delete(
  "/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminMiddleware(ArticleModel, "author", "articleId"),
  removeTagFromArticle
);

export default router;

import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { tagValidation } from "../middlewares/validations/tag.validation.js";
import { ArticleModel } from "../models/article.model.js";

const router = Router();

// ---- Crear etiqueta (admin) ---- //
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  tagValidation,
  validationMiddleware,
  createTag
);

// ---- Listar toditas las etiquetas ---- //
router.get("/", authMiddleware, getTags);

// ---- Obtener etiqueta por ID ---- //
router.get("/:id", authMiddleware, getTagById);

// ---- Listar artículos de un tag ---- //
router.get("/:id/articles", authMiddleware, async (req, res) => {
  try {
    const articles = await ArticleModel.find({ tags: req.params.id })
      .populate("author")
      .populate("tags");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---- Actualizar etiqueta (admin) ---- //
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tagValidation,
  validationMiddleware,
  updateTag
);

// ---- Eliminar etiqueta (solo admin) ---- //
router.delete("/:id", authMiddleware, adminMiddleware, deleteTag);

export default router;

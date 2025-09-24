import { Router } from "express";
import {
  createComment,
  getCommentsByArticle,
  getCommentsByUser,
  getAllComments,
  updateComment,
  deleteComment,
  getCommentById,
} from "../controllers/comment.controller.js";
import {
  authMiddleware,
  ownerOrAdminMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import {
  commentCreateValidation,
  commentUpdateValidation,
} from "../middlewares/validations/comment.validation.js";
import { CommentModel } from "../models/comment.model.js";

const router = Router();

// Crear comentario
router.post(
  "/",
  authMiddleware,
  commentCreateValidation,
  validationMiddleware,
  createComment
);

//---Listar toditos los comentarios (admin)---//
router.get("/", authMiddleware, adminMiddleware, getAllComments);

//----Listar comentarios por artículo---//
router.get("/article/:articleId", authMiddleware, getCommentsByArticle);

//---Listar comentarios de un usuario---//
router.get("/my/:userId", authMiddleware, getCommentsByUser);

//---Obtener comentario por ID---//
router.get("/:id", authMiddleware, getCommentById);

//---Actualizar comentario (autor o admin)---/
router.patch(
  "/:id",
  authMiddleware,
  ownerOrAdminMiddleware(CommentModel, "author"),
  commentUpdateValidation,
  validationMiddleware,
  updateComment
);

//------Eliminar comentario (autor o admin)--------//
router.delete(
  "/:id",
  authMiddleware,
  ownerOrAdminMiddleware(CommentModel, "author"),
  deleteComment
);

export default router;

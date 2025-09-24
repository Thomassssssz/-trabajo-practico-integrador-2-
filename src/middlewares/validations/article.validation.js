import { body } from "express-validator";

export const articleValidation = [
  body("title")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El status debe ser 'published' o 'archived'"),
];

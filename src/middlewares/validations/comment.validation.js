import { body } from "express-validator";

export const commentCreateValidation = [
  body("content")
    .isLength({ min: 5 })
    .withMessage("El contenido debe tener al menos 5 caracteres")
    .isLength({ max: 500 })
    .withMessage("El contenido no puede superar los 500 caracteres"),

  body("article")
    .notEmpty()
    .withMessage("Debe indicar el ID del artículo")
    .isMongoId()
    .withMessage("El ID del artículo no es válido"),

  body("author")
    .notEmpty()
    .withMessage("Debe indicar el ID del autor")
    .isMongoId()
    .withMessage("El ID del autor no es válido"),
];

export const commentUpdateValidation = [
  body("content")
    .optional()
    .isLength({ min: 5 })
    .withMessage("El contenido debe tener al menos 5 caracteres")
    .isLength({ max: 500 })
    .withMessage("El contenido no puede superar los 500 caracteres"),

  body("article")
    .optional()
    .isMongoId()
    .withMessage("El ID del artículo no es válido"),

  body("author")
    .optional()
    .isMongoId()
    .withMessage("El ID del autor no es válido"),
];

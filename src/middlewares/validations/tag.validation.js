import { body } from "express-validator";

export const tagValidation = [
  body("name")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("El nombre no puede tener espacios");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción puede tener como máximo 200 caracteres"),
];

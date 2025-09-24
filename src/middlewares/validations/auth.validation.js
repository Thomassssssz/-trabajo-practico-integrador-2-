import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres"),
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números"
    ),
  body("profile.firstName")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

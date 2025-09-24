import { verifyToken } from "../helpers/jwt.js";
import { UserModel } from "../models/user.model.js";

//------Verifica que el usuario esté logueado-----//
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

//--------Verifica que sea admin---------//
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado, solo admin" });
  }
  next();
};

//----------Verifica que sea dueño del recurso o admin---------//
export const ownerOrAdminMiddleware = (
  model,
  field = "author",
  paramName = "id"
) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramName];
      const resource = await model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ error: "Recurso no encontrado" });
      }

      if (
        resource[field].toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ error: "No autorizado" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};

import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { generateToken } from "../helpers/jwt.js";

//---Registro de usuario----//
export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    //----Hashear contraseña----//
    const hashedPassword = await hashPassword(password);

    // voy a permitir poner el rol desde el body, por defeto es user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user", //---asi aca si mando admin, me coloca como admin---//
      profile,
    });

    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Login de usuario---///
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //----Buscar usuario----//
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    //----Verificar contraseña----//
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Credenciales inválidas" });

    //---Genera token---//
    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----Perfil de usuario autenticado---///
export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

//---Actualizar perfil---//
export const updateProfile = async (req, res) => {
  try {
    req.user.profile = { ...req.user.profile, ...req.body };
    await req.user.save();
    res
      .status(200)
      .json({ message: "Perfil actualizado", profile: req.user.profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//---Logout----//
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Sesión cerrada" });
};

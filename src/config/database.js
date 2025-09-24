import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a la bd");
  } catch (error) {
    console.log("No se pudo conectar a la bd");
  }
};

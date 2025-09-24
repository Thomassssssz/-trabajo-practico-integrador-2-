import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    //-----nombre de usuario unic--------//
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    //----------email unic y validado con regex-------//
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ingrese un email válido"],
    },
    //-------contraseña segura------//
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        //---------regex, al menos 1 minuscula, 1 mayuscula, 1 numero----------//
        validator: (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
        message:
          "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    //---------relacion embebida-------//
    profile: {
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      biography: {
        type: String,
        maxlength: 500,
      },
      avatarUrl: {
        type: String,
        match: [
          /^https?:\/\/.*/,
          "Debe ingresar una URL válida para el avatar",
        ],
      },
      birthDate: {
        type: Date,
      },
    },
    //-------eliminación lógica----------//
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

//---artículos escritos por este usuario---//
userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

//----comentarios hechos por este usuario---//
userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});

//---los virtuals en JSON y objetos---//
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const UserModel = model("User", userSchema);

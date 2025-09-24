import { model, Schema } from "mongoose";
import { ArticleModel } from "./article.model.js";

const tagSchema = new Schema(
  {
    //----name de la etiquetea-----//
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
      validate: {
        //--------sin espacio en el nombre---------//
        validator: (v) => /^\S+$/.test(v), // no permite espacios
        message: "El nombre de la etiqueta no puede contener espacios",
      },
    },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

//------eliminacion enc cascada----------//
tagSchema.pre("findOneAndDelete", async function (next) {
  const tagId = this.getQuery()._id;
  await ArticleModel.updateMany({}, { $pull: { tags: tagId } });
  next();
});

export const TagModel = model("Tag", tagSchema);

import { model, Schema } from "mongoose";
import { CommentModel } from "./comment.model.js";

const articleSchema = new Schema(
  {
    //---Titulito del artículo-----//
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
    },
    excerpt: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    // relacion un usuario puede tener muchos artículos--//
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // relacion un artículo puede tener muchas etiquetas y viceversa--//
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

//----eliminacion en cascada-----//
//--antes de borrar un artículo, eliminamos todos sus comentarios asociados----//
articleSchema.pre("findOneAndDelete", async function (next) {
  const articleId = this.getQuery()._id;
  await CommentModel.deleteMany({ article: articleId });
  next();
});

export const ArticleModel = model("Article", articleSchema);

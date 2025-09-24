import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    //---cont del comentario---///
    content: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", //----relación con modelo User-----//
      required: true,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article", //---relación con modelo Article-------//
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);

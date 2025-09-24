import { CommentModel } from "../models/comment.model.js";

//----Crear un nuevo comentario en un artículo----//
export const createComment = async (req, res) => {
  try {
    const comment = await CommentModel.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Obtener todos los comentarios de un artículo----//
export const getCommentsByArticle = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      article: req.params.articleId,
    }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---Obtener todos los comentarios de un usuario---//
export const getCommentsByUser = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      author: req.params.userId,
    }).populate("article");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----Actualizar un comentario por ID---///
export const updateComment = async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!comment)
      return res.status(404).json({ error: "Comentario no encontrado" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Eliminar un comentario por ID----///
export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comentario no encontrado" });
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//---Obtener todos los comentarios---//
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find()
      .populate("author")
      .populate("article");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----Obtener un comentario por ID----//
export const getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id)
      .populate("author")
      .populate("article");
    if (!comment)
      return res.status(404).json({ error: "Comentario no encontrado" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

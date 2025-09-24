import mongoose from "mongoose";
import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";

//----Para crear una etiqeta solo admn---//
export const createTag = async (req, res) => {
  try {
    const tag = await TagModel.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Obtener todas las etiquetas----//
export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----Obtener una etiqueta por ID----//
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const tag = await TagModel.findById(id);
    if (!tag) {
      return res.status(404).json({ error: "Etiqueta no encontrada" });
    }

    //---------Busca todos los artículos que tienen esta etiqueta-------//
    const articles = await ArticleModel.find({ tags: tag._id });
    res.status(200).json({ tag, articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----Actualizar una etiqueta por ID----///
export const updateTag = async (req, res) => {
  try {
    const tag = await TagModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) return res.status(404).json({ error: "Etiqueta no encontrada" });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Eliminar una etiqueta por ID----//
export const deleteTag = async (req, res) => {
  try {
    const tag = await TagModel.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: "Etiqueta no encontrada" });

    await ArticleModel.updateMany(
      { tags: tag._id },
      { $pull: { tags: tag._id } }
    );

    res
      .status(200)
      .json({ message: "Etiqueta eliminada y removida de artículos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

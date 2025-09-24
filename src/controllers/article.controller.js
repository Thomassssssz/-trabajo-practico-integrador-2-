import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";

//---Crear un nuevo artículo---//
export const createArticle = async (req, res) => {
  try {
    const article = await ArticleModel.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Obtener todos los artículos---//
export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author")
      .populate("tags");
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---Obtener un artículo por ID----//
export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("author")
      .populate("tags");
    if (!article)
      return res.status(404).json({ error: "Artículo no encontrado" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//----Actualizar un artículo por ID----//
export const updateArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!article)
      return res.status(404).json({ error: "Artículo no encontrado" });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//----Eliminar un artículo por ID---///
export const deleteArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (!article)
      return res.status(404).json({ error: "Artículo no encontrado" });
    res.status(200).json({ message: "Artículo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---Agregar un tag a un artículo---//
export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    const article = await ArticleModel.findById(articleId);
    if (!article)
      return res.status(404).json({ error: "Artículo no encontrado" });

    const tag = await TagModel.findById(tagId);
    if (!tag) return res.status(404).json({ error: "Etiqueta no encontrada" });

    if (!article.tags.includes(tagId)) {
      article.tags.push(tagId);
      await article.save();
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---Remover un tag de un artículo---//
export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    const article = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $pull: { tags: tagId } },
      { new: true }
    ).populate("author tags");

    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controllers/animeController.js
const { Anime } = require('../db/sequelize');

const animeController = {
  // Salva um novo anime
  saveAnime: async (req, res) => {
    try {
      const { name, container } = req.body;

      const anime = await Anime.create({ name, container });

      return res.status(201).json({ success: true, message: 'Anime salvo com sucesso', anime });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro ao salvar o anime' });
    }
  },

  // Obtém todos os animes
  getAllAnimes: async (req, res) => {
    try {
      const animes = await Anime.findAll();

      return res.status(200).json({ success: true, animes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro ao obter os animes' });
    }
  },

  // Atualiza um anime
  updateAnime: async (req, res) => {
    try {
      const { id, name, container } = req.body;

      const updatedAnime = await Anime.update({ name, container }, { where: { id } });

      if (updatedAnime[0] === 1) {
        return res.status(200).json({ success: true, message: 'Anime atualizado com sucesso' });
      } else {
        return res.status(404).json({ success: false, message: 'Anime não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro ao atualizar o anime' });
    }
  },

  // Exclui um anime
  deleteAnime: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedAnime = await Anime.destroy({ where: { id } });

      if (deletedAnime === 1) {
        return res.status(200).json({ success: true, message: 'Anime excluído com sucesso' });
      } else {
        return res.status(404).json({ success: false, message: 'Anime não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro ao excluir o anime' });
    }
  },
};

module.exports = animeController;

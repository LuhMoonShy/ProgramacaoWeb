const express = require('express');
const router = express.Router();
const { Anime } = require('../db/sequelize');

// Salva um novo anime
router.post('/save', async (req, res) => {
  try {
    const { name, container } = req.body;

    const anime = await Anime.create({ name, container });

    res.status(201).json({ success: true, anime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Obtém todos os animes
router.get('/getAll', async (req, res) => {
  try {
    const animes = await Anime.findAll();

    res.status(200).json({ success: true, animes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Atualiza um anime
router.put('/update', async (req, res) => {
  try {
    const { id, name, container } = req.body;

    const [updatedRows] = await Anime.update({ name, container }, { where: { id } });

    if (updatedRows > 0) {
      res.status(200).json({ success: true, message: 'Anime atualizado com sucesso' });
    } else {
      res.status(404).json({ success: false, message: 'Anime não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Exclui um anime
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await Anime.destroy({ where: { id } });

    if (deletedRows > 0) {
      res.status(200).json({ success: true, message: 'Anime excluído com sucesso' });
    } else {
      res.status(404).json({ success: false, message: 'Anime não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

module.exports = router;

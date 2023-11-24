// models/anime.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Certifique-se de importar corretamente a instância do Sequelize

const Anime = sequelize.define('Anime', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Anime;

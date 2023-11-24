const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); 

const Anime = sequelize.define('Anime', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Anime;

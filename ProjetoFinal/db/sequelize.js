const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configurações do banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite',
  logging: false, // Desativar logs do Sequelize (opcional)
});

// Definição do modelo User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Definição do modelo Session
const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.TEXT,
  },
});

// Definição do modelo Anime
const Anime = sequelize.define('Anime', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Outros campos do anime
});

// Relacionamento entre User e Session (um usuário pode ter várias sessões)
User.hasMany(Session);
Session.belongsTo(User);

// Relacionamento entre User e Anime (um usuário pode ter vários animes)
User.hasMany(Anime);
Anime.belongsTo(User);

// Configuração do SequelizeStore para armazenar sessões no banco de dados
const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 24 * 60 * 60 * 1000, // Tempo de expiração da sessão em milissegundos (opcional)
});

module.exports = { sequelize, User, Session, Anime, sessionStore };

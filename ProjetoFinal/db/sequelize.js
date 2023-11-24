const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite',
  logging: false, 
});

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

const Anime = sequelize.define('Anime', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Anime);
Anime.belongsTo(User);

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 24 * 60 * 60 * 1000, 
});

module.exports = { sequelize, User, Session, Anime, sessionStore };

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const { sequelize, User, Session, sessionStore, Anime } = require('./db/sequelize.js');
const userController = require('./controllers/userController');
const animeController = require('./controllers/animeController'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
session({
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
})
);

sequelize.sync().then(() => {
console.log('Banco de dados sincronizado');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

const userRoutes = require('./routes/userRoutes');
const animeRoutes = require('./routes/animeRoutes'); 
app.use('/user', userRoutes);
app.use('/anime', animeRoutes); 

app.get('/', (req, res) => {
res.render('index', { alertMessage: null });
});

app.get('/home', async (req, res) => {
try {
  const userId = req.session.userId;
  const user = await User.findByPk(userId);
  if (user) {
    res.render('home');
  } else {
    res.redirect('/');
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
}
});

app.get('/settings', async (req, res) => {
try {
  const userId = req.session.userId;
  const user = await User.findByPk(userId);
  if (user) {
    res.render('settings', { user });
  } else {
    res.redirect('/');
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
}
});

app.post('/settings', userController.editUser);
app.post('/user/delete', userController.deleteProfile);

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});

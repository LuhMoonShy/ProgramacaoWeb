const express = require('express');
const router = express.Router();
const { User } = require('../db/sequelize.js');

router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.create({ email, username, password });

    res.redirect('/?message=Usuario+cadastrado+com+sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.post('/login', async (req, res) => {
try {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (user) {
    req.session.userId = user.id;
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
} catch (error) {
  console.error(error);
  res.status(500).send('Erro interno do servidor');
}
});

module.exports = router;

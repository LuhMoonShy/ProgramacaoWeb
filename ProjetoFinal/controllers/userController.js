const { User } = require('../db/sequelize');

const userController = {
  createUser: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }

      const newUser = await User.create({ email, username, password });

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  editUser: async (req, res) => {
    try {
      const userId = req.session.userId;
      const { email, username, password } = req.body;

      await User.update({ email, username, password }, { where: { id: userId } });

      return res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const userId = req.session.userId;
  
      await User.destroy({ where: { id: userId } });
  
      // Configurar a expiração da sessão para imediatamente
      req.session.cookie.expires = new Date();
      req.session.cookie.maxAge = 0;
  
      res.status(200).json({ success: true, message: 'Perfil excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  },
};

module.exports = userController;

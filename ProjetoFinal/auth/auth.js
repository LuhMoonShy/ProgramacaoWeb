// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const User = require('../models/userModel');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const newUser = await User.create({
            email,
            username,
            password,
        });

        const token = signToken(newUser.id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao cadastrar usuário.',
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Usuário ou senha incorretos.',
            });
        }

        const token = signToken(user.id);

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao realizar login.',
        });
    }
};

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Você não está logado. Faça o login para acessar.',
        });
    }

    try {
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const currentUser = await User.findByPk(decoded.id);

        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'O usuário associado a este token não existe mais.',
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token inválido.',
        });
    }
};

const express = require('express');
const { users } = require('../controllers');
const validateLogin = require('../middlewares/validateLogin');
const validateNewUser = require('../middlewares/validateNewUser');

const router = express.Router();

// Listar usuario por id
router.get('/:id', users.listById);

// Listar usuario por username
router.get('/username/:username', users.listByUsername);

// Listar todos usuarios
router.get('/', users.listAll);

// Login
router.post('/login', validateLogin, users.login);

// Novo usuario
router.post('/', validateNewUser, users.create);
module.exports = router;

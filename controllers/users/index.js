const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { user } = require('../../models');
async function login(req, res, next) {
  try {
    const { username, password, rememberMe } = req.body;
    if (!username || !password) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'É necessário usuário e senha para fazer login' });
    }
    const users = await user.findUserByUsername(username);
    if (!user)
      return res.status(StatusCodes.OK).json({ message: 'Usuário não existe' });

    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.status(StatusCodes.OK).json({ message: 'Senha inválida' });
      }
      const jwtConfig = {
        expiresIn: rememberMe ? '7D' : '1D',
        algorithm: 'HS256',
      };
      users.password = ' ';
      users._previousDataValues.password = ' ';
      const token = jwt.sign({ data: users }, SECRET, jwtConfig);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Login realizado com sucesso', token });
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro interno', error: err.message });
  }
}

async function listById(req, res, next) {
  const { id } = req.params;
  try {
    const users = await user.findUserById(id);
    return res.status(StatusCodes.OK).json({
      users,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByUsername(req, res, next) {
  const { username } = req.params;
  try {
    const users = await user.findUserByUsername(username);
    return res.status(StatusCodes.OK).json({
      users,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listAll(req, res, next) {
  try {
    const users = await user.listAll();
    return res.status(StatusCodes.OK).json({
      users,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const { username, password, nivelAcesso } = req.body;
  try {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = {
          username,
          password: hash,
          nivelAcesso,
        };
        const users = await user.create(newUser);
        return res.status(StatusCodes.OK).json({
          users,
          success: 1,
          message: 'Usuário criado com sucesso!',
        });
      });
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  login,
  listById,
  listByUsername,
  listAll,
  create
};

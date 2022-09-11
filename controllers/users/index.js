const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { user } = require('../../models');
const SECRET = process.env.SECRET;

async function login(req, res, next) {
  try {
    const { username, password, rememberMe } = req.body;
    const users = await user.findUserByUsername(username);
    if (!users)
      return res.status(StatusCodes.OK).json({ message: 'Usuário não existe' });

    bcrypt.compare(password, users.password, function (err, result) {
      if (!result) {
        return res.status(StatusCodes.OK).json({ message: 'Senha inválida' });
      }
      const jwtConfig = {
        expiresIn: rememberMe ? '7D' : '1D',
        algorithm: 'HS256',
      };

      const token = jwt.sign(
        {
          data: {
            id: users.id,
            username: users.username,
            nivelAcesso: users.nivelAcesso,
            createdAt: users.created_at,
          },
        },
        SECRET,
        jwtConfig,
      );
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Login realizado com sucesso', token, success: 1 });
    });
  } catch (err) {
    next(err);
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
  create,
};

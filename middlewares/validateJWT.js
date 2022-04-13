const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const prisma = require('../utils/prismaClient');
const { SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token não encontrado!',
      success: 0,
    });
  }
  try {
    const { data } = jwt.verify(token, SECRET);
    const user = await prisma.users.findFirst({
      where: {
        username: {
          equals: data.username,
        },
      },
    });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Usuário não encontrado!',
        success: 0,
      });
    }
    req.user = {
      id: user.id,
      username: user.username,
      nivelAcesso: user.nivelAcesso,
      createdAt: user.created_at,
    };
    next();
  } catch (error) {
    next(error);
  }
};

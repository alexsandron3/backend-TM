const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const prisma = new PrismaClient();
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Message: 'Token não encontrado!',
      success: 0,
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.users.findUnique({
      where: {
        username: decoded.username,
      },
    });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        Message: 'Usuário não encontrado!',
        success: 0,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

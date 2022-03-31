const { PrismaClient } = require('@prisma/client');
const userSchema = require('../schemas/user');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const { username } = req.body;
  try {
    await userSchema.validateAsync(req.body);
    const userExists = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (userExists) {
      return res.status(400).json({
        success: 0,
        message: 'Usuário já cadastrado!',
      });
    }
    return next();
  } catch (error) {
    next(error);
  }
};

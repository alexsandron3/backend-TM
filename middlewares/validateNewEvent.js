const { messages } = require('joi-translation-pt-br');
const { newEventSchema } = require('../schemas/event');

module.exports = async (req, res, next) => {
  try {
    const validatedEvent = await newEventSchema.validateAsync(req.body, {
      messages,
    });
    req.eventData = validatedEvent;
    return next();
  } catch (error) {
    next(error);
  }
};

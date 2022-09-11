const listAll = require('./listAll');
const listById = require('./listById');
const listByStartEndDate = require('./listByStartEndDate');
const listByText = require('./listByText');
const changeStatus = require('./changeStatus');
const deleteEvent = require('./delete');
const listByDate = require('./listByDate');
const create = require('./create');

module.exports = {
  listAll,
  listById,
  listByStartEndDate,
  listByText,
  changeStatus,
  deleteEvent,
  listByDate,
  create,
};

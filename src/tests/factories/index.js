const authFactory = require('./auth_factory');
const noteFactory = require('./note_factory');

module.exports = {
  ...authFactory,
  ...noteFactory,
};

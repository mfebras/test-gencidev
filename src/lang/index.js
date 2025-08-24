const i18n = require('i18n');
const path = require('path');

// Configure shared state
i18n.configure({
  directory: path.join(__dirname, '/locales'),
  defaultLocale: process.env.LANGUAGE
});

module.exports = (key, params) => {
  return i18n.__(key, params);
}

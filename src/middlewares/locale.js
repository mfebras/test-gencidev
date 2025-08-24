const i18n = require('i18n');

/*
 * Set default language from query string
 */
module.exports = (req, _res, next) => {
  const locales = ['id', 'en'];
  const locale = locales.includes(req.query.lang)
    ? req.query.lang
    : process.env.LANGUAGE;

  i18n.setLocale(locale);

  next();
}

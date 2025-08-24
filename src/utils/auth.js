const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lang = require('../lang');
const { dateAdd } = require('./date');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
  return bcrypt.hash(password, salt)
};

exports.validatePassword = (password, hash) => bcrypt.compare(password, hash);

function getExpiryDate(timeString) {
  const match = timeString.match(/^(\d+)([a-zA-Z]+)$/);
  if (!match) {
    throw new Error(lang('jwt.expiry'));
  }

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  const units = {
    m: 'minute',
    h: 'hour',
    d: 'day',
    mo: 'month',
    year: 'year',
  };

  if (!units[unit]) {
    throw new Error(lang('jwt.expiry.unit'));
  }

  return dateAdd(value, units[unit]);
}

exports.getToken = (user) => {
  // Only set a few attributes
  const data = {
    id: user.id,
    email: user.email,
    remember_me: user.remember_me,
  };

  const expiresIn = 60 * 60 * process.env.JWT_EXPIRY;

  const token = jwt.sign(
    { data },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  const refreshExp = user.remember_me
    ? process.env.JWT_REFRESH_EXTENDED_EXPIRY
    : process.env.JWT_REFRESH_EXPIRY;

  const refreshToken = jwt.sign(
    { data },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: refreshExp }
  );

  return {
    access_token: token,
    refresh_token: refreshToken,
    access_token_exp: dateAdd(expiresIn, 'second'),
    refresh_token_exp: getExpiryDate(refreshExp),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      remember_me: user.remember_me,
    }
  };
};

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

exports.verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_SECRET_REFRESH);

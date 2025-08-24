const lang = require('../../lang');
const repository = require('./auth_repository');
const {
  dateFormat,
  fail,
  getToken,
  hashPassword,
  logger,
  success,
  validatePassword,
  verifyRefreshToken
} = require('../../utils');

exports.register = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    created_at: dateFormat()
  };
  await repository.register(payload);

  return success(res, lang('success'));
}

exports.login = async (req, res) => {
  const user = await repository.findByEmail(req.body.email);

  if (user) {
    const isPasswordValid = await validatePassword(req.body.password, user.password);
    if (isPasswordValid) {
      user.remember_me = req.body.remember_me;
      const data = getToken(user);

      return success(res, lang('success'), data);
    }
  }

  return fail(res, lang('auth.credential.invalid'));
}

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.refresh_token;
    const decoded = verifyRefreshToken(token);

    const user = await repository.findByEmail(decoded.data.email);
    if (!user) {
      return fail(res, lang('not.found'));
    }

    user.remember_me = decoded.data.remember_me;
    const data = getToken(user);

    return success(res, lang('success'), data);
  } catch (error) {
    logger('Refresh Token', error);
    return fail(res, lang('auth.token.invalid'));
  }
}

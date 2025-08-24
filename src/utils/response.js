const lang = require('../lang');

exports.success = (res, message = null, data = null, code = 200) => {
  const response = {
    status: true,
    message: message,
    data: data
  }

  return res.status(code).json(response);
}

exports.fail = (res, message = null, code = 400) => {
  const response = {
    status: false,
    message: typeof message == 'object'
      ? (message.message ?? null)
      : message
  }

  if (code == 500 && process.env.NODE_ENV == 'production') {
    response.message = lang('_500');
  } else if (typeof message == 'object') {
    response.errors = message;
  }

  return res.status(code).json(response);
}

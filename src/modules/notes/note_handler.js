const lang = require('../../lang');
const repository = require('./note_repository');
const { dateFormat, fail, success } = require('../../utils');

exports.fetch = async (req, res) => {
  const {
    limit,
    page,
    sort,
    order
  } = req.query;

  const data = await repository.paginate(req.auth.id, limit, page, sort, order);

  return success(res, lang('success'), data);
}

exports.store = async (req, res) => {
  const payload = {
    user_id: req.auth.id,
    title: req.body.title,
    description: req.body.description || null,
  };

  const [data] = await repository.store(payload);

  return success(res, lang('success.store'), data);
}

exports.update = async (req, res) => {
  const note = await repository.find(req.auth.id, req.params.id);

  if (!note) {
    return fail(res, lang('not_found'), 404);
  }

  const payload = {
    title: req.body.title,
    description: req.body.description || null,
    updated_at: dateFormat()
  };

  const [data] = await repository.update(req.auth.id, req.params.id, payload);

  return success(res, lang('success.update'), data);
}

exports.destroy = async (req, res) => {
  const note = await repository.find(req.auth.id, req.params.id);

  if (!note) {
    return fail(res, lang('not_found'), 404);
  }

  await repository.destroy(req.auth.id, req.params.id);

  return success(res, lang('success.delete'));
}

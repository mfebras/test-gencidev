const DB = require('../../database');
const { TABLES } = require('../../utils');

const columns = [
  'id',
  'title',
  'description',
  'created_at',
  'updated_at'
];

exports.paginate = async (userId, limit = 10, page = 1, sort = 'id', order = 'DESC') => {
  const offset = (page - 1) * limit;

  const [notes, [count]] = await Promise.all(([
    // Get Note
    DB(TABLES.NOTE)
      .select(columns)
      .where('user_id', userId)
      .orderBy(sort, order)
      .limit(limit)
      .offset(offset),

    // Count
    DB(TABLES.NOTE)
      .where('user_id', userId)
      .count({ total: ['id'] })
  ]));

  return {
    list: notes,
    total_rows: count?.total
  }
}

exports.find = (userId, id) => DB(TABLES.NOTE)
  .where({ id, 'user_id': userId })
  .first();

exports.store = (payload) => DB(TABLES.NOTE)
  .insert(payload)
  .returning(columns);

exports.update = (userId, id, payload) => DB(TABLES.NOTE)
  .where({ id, 'user_id': userId })
  .update(payload)
  .returning(columns);

exports.destroy = (userId, id) => DB(TABLES.NOTE)
  .where({ id, 'user_id': userId })
  .del();

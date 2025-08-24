const { randParagraph, randSentence } = require('@ngneat/falso');
const { TABLES } = require('../../utils');
const DB = require('../../database');

exports.notePayload = (isValid = true) => {
  return {
    title: isValid ? randSentence().substr(0, 255) : 'a'.repeat(256),
    description: randParagraph(),
  };
}

exports.getNote = async (userId) => {
  let note = await DB(TABLES.NOTE)
    .where('user_id', userId)
    .orderByRaw('RANDOM()')
    .first();

  if (!note) {
    const payload = this.notePayload();
    payload.user_id = userId;

    [note] = await DB(TABLES.NOTE).insert(payload).returning('*');
  }

  return note;
}

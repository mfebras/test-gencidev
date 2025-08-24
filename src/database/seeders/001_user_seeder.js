const { randFullName } = require('@ngneat/falso');
const { hashPassword, TABLES } = require('../../utils');

exports.seed = async (knex) => {
  await knex.transaction(async (trx) => {
    try {
      // Deactive constraint
      // (should be used within transaction, so it can automatically activate the constraint)
      await trx.raw('SET CONSTRAINTS ALL DEFERRED');

      // Truncate with reset sequence
      await trx.raw(`TRUNCATE TABLE ${TABLES.USER} RESTART IDENTITY CASCADE`);

      const passwordHash = await hashPassword('Qwerty11');
      const batchSize = 100;

      // Create customers
      const data = [];
      for (let i = 1; i <= 100; i++) {
        data.push({
          name: randFullName(),
          email: `user${i}@mail.com`,
          password: passwordHash,
        });
      }

      // batch insert
      await trx.batchInsert(TABLES.USER, data, batchSize);

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  });
}

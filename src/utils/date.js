const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

exports.dateFormat = (date = null, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
    date = dayjs();
  } else {
    date = dayjs(date);
  }

  return date.tz(process.env.TZ).format(format);
};

exports.dateAdd = (amount, unit, date = null, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
    date = dayjs();
  } else {
    date = dayjs(date);
  }

  return date.tz(process.env.TZ).add(amount, unit).format(format);
};

const fs = require('fs');
const path = require('path');
const { dateFormat } = require('./date');

const getDir = (filename) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dir = path.join(__dirname, `../../logs/${year}/${month}/${day}`);
  const filePath = `${dir}/${filename}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return filePath;
}

/**
 * @param {string} title
 * @param {object} payload
 * @param {string} filename
 * 
 * When type = file, filename is file log name
 * else filename is the source file where error occur
 */
exports.logger = (title, payload, filename = 'error.log') => {
  const filePath = getDir(filename);

  let message = payload;
  if (payload?.stack) { // Handle error object
    message = payload.stack;
  } else if (typeof payload === 'object' || Array.isArray(payload)) {
    message = JSON.stringify(payload);
  }

  fs.appendFileSync(filePath, `[${dateFormat()}]\n============ ${title} ============\n${message}\n\n`);

  if (process.env.NODE_ENV === 'development') {
    console.log(`=== ${title} ===\n`, payload);
  }
}

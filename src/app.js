require('dotenv').config();

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const config = require('./config/app');
const locale = require('./middlewares/locale');
const routes = require('./routes');
const { errorHandler } = require('./utils');

const port = process.env.APP_PORT;

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use(helmet());
app.use(compression({ 
  level: 6,
  threshold: '1kb' // Compress only when > 1kb
}));

// Parse & limit JSON & form request size
app.use(express.json({ limit: config.request_limit_size }));
app.use(express.urlencoded({
  limit: config.request_limit_size,
  extended: true,
  parameterLimit: 20
}));

// CORS
app.use(cors(config.cors_options));

app.use(locale);
app.use('/', routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, async () => {
    console.log(`App listening on port ${port} 🚀`);
  });

  const shutdown = () => {
    server.close(async () => {
      console.log('Closing the app');
      process.exit(0);
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

module.exports = app;

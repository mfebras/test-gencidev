const fs = require('fs');

function readFiles(dir) {
  let paths = {};
  fs.readdirSync(dir).forEach(function (file) {
    if (file.endsWith('.json')) {
      const content = require(dir + file);
      paths = { ...paths, ...content };
    }
  });
  return paths;
}

// Read paths json
let pathsDir = `${__dirname}/paths/`;
let paths = readFiles(pathsDir);

// Read schemas json
let schemasDir = `${__dirname}/schemas/`;
let schemas = readFiles(schemasDir);

exports.definitions = {
  openapi: '3.0.3',
  info: {
    title: `${process.env.APP_NAME} API`,
    description: 'API Documentation',
    version: '1.0.0',
  },
  servers: [
    {
      url: `${process.env.APP_URL}/api/v1`,
      description: 'Development server',
    }
  ],
  paths: paths,
  components: {
    schemas: schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}

exports.options = {
  customSiteTitle: `${process.env.APP_NAME} API Docs`,
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
  }
}

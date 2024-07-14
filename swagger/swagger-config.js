// scraper-project/swagger/swagger-config.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Web Scraper API Documentation',
      version: '1.0.0',
      description: 'API documentation for your web scraper project',
    },
  },
  apis: ['./scrappers/**/*.js', './server.js'], // Ensure paths are correct
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};


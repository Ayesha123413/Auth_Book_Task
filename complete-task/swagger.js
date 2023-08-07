// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const options = {
    swaggerDefinition: {
        info: {
            title: 'Book Management API',
            version: '1.0.0',
            description: 'API documentation for managing books',
        },
    },
    apis: ['./src/routes/*'], // Add the main application file where your routes are defined
};

// Initialize Swagger
const specs = swaggerJsdoc(options);

module.exports = specs;
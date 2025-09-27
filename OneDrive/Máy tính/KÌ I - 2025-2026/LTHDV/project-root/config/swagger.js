const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product-Supplier API',
            version: '1.0.0',
            description: 'API documentation for Product-Supplier App'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local server' }
        ]
    },
    apis: ['./routes/*.js'], // Swagger sẽ đọc comment trong routes
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Supplier-Product API",
            version: "1.0.0"
        }
    },
    apis: ["./routes/*.js"] // look for annotations in route files
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
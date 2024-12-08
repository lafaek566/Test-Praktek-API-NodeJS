import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description:
        "A simple REST API for user registration, login, balance management, and transactions",
    },
    servers: [
      {
        url: "http://localhost:5001", // Your server URL
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Format token sebagai JWT
        },
      },
    },
    security: [
      {
        Bearer: [], // Ini digunakan untuk setiap endpoint yang memerlukan autentikasi
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

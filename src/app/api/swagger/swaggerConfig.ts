import swaggerUi from "swagger-ui-express";
import express, { Express } from "express";
import swaggerDocument from "./swaggerDocs"; // Importa o documento já tipado

export function setupSwagger(app: Express) {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Swagger UI disponível em http://localhost:3000/api/docs");
}

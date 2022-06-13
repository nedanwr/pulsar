import "dotenv/config";
import express, { Application } from "express";

// Init Express
const app: Application = express();

// Start Server
app.listen(8080, () => console.log("Server started on port 8080"));
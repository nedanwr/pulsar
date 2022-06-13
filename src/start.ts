import "dotenv/config";
import express, { Application, Request, Response } from "express";
import {
    __prod__,
    port,
    env
} from "./lib/constants";

// Init Express
const app: Application = express();

// Add logging in dev mode
if (!__prod__) {
    app.use(require("morgan")("dev"));
}

// Body Parser
app.use(express.urlencoded({
    extended: true,
}));
// JSON Parser
app.use(express.json());

// Send welcome message
app.get("/", (_req:Request, res:Response) => {
    res.status(200).json({
        statusCode: 200,
        message: "Welcome to the Pulsar API"
    })
});

// Start Server
app.listen(port, () => console.log(`Server started in ${env} mode on port ${port}`));
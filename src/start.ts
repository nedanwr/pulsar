import "dotenv/config";
import express, { Application } from "express";
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

// Start Server
app.listen(8080, () => console.log("Server started on port 8080"));
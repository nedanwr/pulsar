import "./start";
import { errorHandler } from "./errorHandler";

process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);
process.on("uncaughtExceptionMonitor", errorHandler);
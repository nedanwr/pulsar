interface ErrorType {
    stack: any;
}

export const errorHandler = (error: ErrorType) => {
    console.error(error.stack || error);
    process.exit(1);
}
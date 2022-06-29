import { initializeApp } from "firebase/app";
const serviceAccount = require("../../firebaseServiceAccount.json");

export const firebase = initializeApp(serviceAccount);
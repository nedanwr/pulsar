import { initializeApp } from "firebase-admin";
import "firebase/app";
import {
    firebaseAPIKey,
    firebaseAuthDomain,
    firebaseProjectID,
    firebaseStorageBucket,
    firebaseMessagingSenderID,
    firebaseAppID
} from "@lib/constants";

const firebaseConfig: object = {
    apiKey: firebaseAPIKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectID,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderID,
    appId: firebaseAppID
}

export const firebase = initializeApp(firebaseConfig);
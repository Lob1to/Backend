import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { envs } from "./envs.plugin";



const firebaseConfig = {
    apiKey: envs.FIREBASE_API_KEY,
    authDomain: envs.FIREBASE_AUTH_DOMAIN,
    projectId: envs.FIREBASE_PROJECT_ID,
    storageBucket: envs.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envs.FIREBASE_MESSAGING_SENDER_ID,
    appId: envs.FIREBASE_APP_ID,
    measurementId: envs.FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
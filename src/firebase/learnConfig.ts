import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const learnFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_LEARN_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_LEARN_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_LEARN_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_APP_ID,
};

const LEARN_APP_NAME = 'learn-platform';

let learn_app;
try {
  learn_app = getApp(LEARN_APP_NAME);
} catch {
  learn_app = initializeApp(learnFirebaseConfig, LEARN_APP_NAME);
}

export const learnAuth = getAuth(learn_app);
export const learnDb = getFirestore(learn_app, 'default');
export default learn_app;
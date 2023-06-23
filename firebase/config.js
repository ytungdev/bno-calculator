import { initializeApp, getApps } from "firebase/app";
import firebaseConfig from './secretFirebaseConfig'

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
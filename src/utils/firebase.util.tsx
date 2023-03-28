import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence, getAuth, setPersistence,
} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '../environment/environment';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });

setPersistence(auth, browserLocalPersistence);

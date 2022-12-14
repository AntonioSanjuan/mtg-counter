import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential, GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../utils/firebase.util';

export function firebaseSignUp(user: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, user, password);
}

export function firebaseLogin(user: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, user, password);
}

export function firebaseGoogleLogin(): Promise<UserCredential> {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function firebaseLogout(): Promise<void> {
  return signOut(auth);
}

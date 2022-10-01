import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential,
} from 'firebase/auth';
import { auth } from '../../utils/firebase.util';

export function firebaseSignUp(user: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, user, password);
}

export function firebaseLogin(user: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, user, password);
}

export function firebaseLogout(): Promise<void> {
  return signOut(auth);
}

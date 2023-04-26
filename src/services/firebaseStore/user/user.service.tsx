import {
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUser.model';
import { auth, db } from '../../../utils/firebase.util';

export function getUser(): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return getDoc(userRef);
}

export function setUser(settings: FirebaseUserSettingsDto, gameId: string): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, {
    userSettings: settings,
    currentGame: doc(db, 'games', gameId),
    historicGames: [],
  } as FirebaseUserDto, { merge: true });
}

export function updateUser(settings: FirebaseUserSettingsDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { userSettings: settings }, { merge: true });
}

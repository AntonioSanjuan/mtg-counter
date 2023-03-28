import {
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { auth, db } from '../../../utils/firebase.util';

export function getUserSettings(): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return getDoc(userRef);
}

export function setUserSettings(settings: FirebaseUserSettingsDto, gameId: string): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, {
    userSettings: settings,
    currentGame: doc(db, 'games', gameId),
  } as FirebaseUserDto, { merge: true });
}

export function updateUserSettings(settings: FirebaseUserSettingsDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { userSettings: settings }, { merge: true });
}

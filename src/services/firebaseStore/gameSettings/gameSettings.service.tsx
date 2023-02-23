import {
  addDoc,
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { auth, db } from '../../../utils/firebase.util';

export function getGameSettings(gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> {
  console.log('🚀 ~ file: gameSettings.service.tsx:10 ~ getGameSettings ~ gameSettingsId', gameSettingsId);
  const userRef = doc(db, 'games', gameSettingsId);
  return getDoc(userRef);
}

export async function setGameSettings(settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'games');
  return setDoc(docRef, settings);
}

export function updateGameSettings(settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { game: settings }, { merge: true });
}

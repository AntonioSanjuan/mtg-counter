import {
  addDoc,
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { auth, db } from '../../../utils/firebase.util';

export function getGame(gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'games', gameSettingsId);
  return getDoc(userRef);
}

export async function setGame(settings: FirebaseGameDto): Promise<any> {
  const docRef = collection(db, 'games');
  return addDoc(docRef, settings);
}

export function updateGame(gameSettingsId: string, settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'games', gameSettingsId);
  return setDoc(docRef, settings, { merge: true });
}

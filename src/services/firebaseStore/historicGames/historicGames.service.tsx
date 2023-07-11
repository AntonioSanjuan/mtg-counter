import {
  addDoc,
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseHistoricGamesDto } from '../../../models/dtos/firebaseStore/firebaseHistoricGames.model';
import { db } from '../../../utils/firebase.util';

export function getHistoricGames(historicId: string): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'historicGames', historicId);
  return getDoc(userRef);
}

export async function setHistoricGames(historicGames: FirebaseHistoricGamesDto): Promise<any> {
  const docRef = collection(db, 'historicGames');
  return addDoc(docRef, historicGames);
}

export function updateHistoricGames(historicId: string, historicGames: FirebaseHistoricGamesDto): Promise<any> {
  const docRef = doc(db, 'historicGames', historicId);
  return setDoc(docRef, historicGames, { merge: true });
}

import {
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, getDocs, query, QuerySnapshot, setDoc, where,
} from 'firebase/firestore';
import { FirebaseUserDto, FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUser.model';
import { auth, db } from '../../../utils/firebase.util';

export function getUser(): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return getDoc(userRef);
}

export function getUserByUsername(userName: string): Promise<QuerySnapshot<DocumentData>> {
  const userCollectionRef = collection(db, 'users');
  const q = query(userCollectionRef, where('userName', '==', userName));

  return getDocs(q);
}
export function setUser(
  settings: FirebaseUserSettingsDto,
  gameId: string,
  historicId: string,
  userName: string,
): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, {
    userName,
    userSettings: settings,
    currentGame: doc(db, 'games', gameId),
    historicGames: doc(db, 'historicGames', historicId),
  } as FirebaseUserDto, { merge: true });
}

export function updateUser(settings: FirebaseUserSettingsDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { userSettings: settings }, { merge: true });
}

export function updateUserCurrentGame(gameId: string): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, {
    currentGame: doc(db, 'games', gameId),
  } as FirebaseUserDto, { merge: true });
}

import {
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc, updateDoc,
} from 'firebase/firestore';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { auth, db } from '../../../utils/firebase.util';

export function getUserSettings(): Promise<DocumentSnapshot<DocumentData>> {
  const docRef = doc(db, 'userSettings', auth?.currentUser?.uid ?? '');
  return getDoc(docRef);
}

export function setUserSettings(firebaseUser: FirebaseUserSettingsDto): Promise<any> {
  const docRef = doc(db, 'userSettings', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, firebaseUser);
}

export function updateUserSettings(firebaseUser: FirebaseUserSettingsDto): Promise<any> {
  const docRef = doc(db, 'userSettings', auth?.currentUser?.uid ?? '');
  return updateDoc(docRef, { ...firebaseUser });
}
// todo push new savedArticle

import {
  addDoc,
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { db } from '../../../utils/firebase.util';
import { FirebaseDeckCollectionDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

export function getDeckCollection(deckCollectionId: string): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'deckCollections', deckCollectionId);
  return getDoc(userRef);
}

export async function setDeckCollection(deckCollection: FirebaseDeckCollectionDto): Promise<any> {
  const docRef = collection(db, 'deckCollections');
  return addDoc(docRef, deckCollection);
}

export function updateDeckCollection(
  deckCollectionId: string,
  deckCollection: FirebaseDeckCollectionDto,
): Promise<any> {
  const docRef = doc(db, 'deckCollections', deckCollectionId);
  return setDoc(docRef, deckCollection, { merge: true });
}

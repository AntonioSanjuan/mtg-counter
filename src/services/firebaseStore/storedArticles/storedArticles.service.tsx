import {
  collection, deleteDoc, doc, DocumentData, getDocs, query, QuerySnapshot, setDoc, where,
} from 'firebase/firestore';
import { FirebaseStoredArticleDto } from '../../../models/dtos/firebaseStore/firebaseStoredArticle.model';
import { auth, db } from '../../../utils/firebase.util';

export function getUserStoredArticles(): Promise<QuerySnapshot<DocumentData>> {
  const q = query(collection(db, 'storedArticles'), where('userUid', '==', auth.currentUser ? auth.currentUser?.uid : 'null'));
  return getDocs(q);
}

export function addUserStoredArticle(article: FirebaseStoredArticleDto): Promise<any> {
  const docRef = doc(db, 'storedArticles', article.articleId);
  return setDoc(docRef, article);
}

export function deleteUserStoredArticle(article: FirebaseStoredArticleDto): Promise<void> {
  const docRef = doc(db, 'storedArticles', article.articleId);
  return deleteDoc(docRef);
}

// todo push new savedArticle

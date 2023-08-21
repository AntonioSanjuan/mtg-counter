import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc, DocumentData, DocumentSnapshot, getDoc, setDoc,
} from 'firebase/firestore';
import { FirebaseGameDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { auth, db } from '../../../utils/firebase.util';

export async function getGame(gameSettingsId: string): Promise<DocumentSnapshot<DocumentData>> {
  const userRef = doc(db, 'games', gameSettingsId);
  return getDoc(userRef);
}

export async function setGame(settings: FirebaseGameDto): Promise<any> {
  const docRef = collection(db, 'games');
  return addDoc(docRef, settings);
}

export async function updateGame(gameSettingsId: string, settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'games', gameSettingsId);
  return setDoc(docRef, settings, { merge: true });
}

export async function updateGamePlayer(
  gameSettingsId: string,
  settings: FirebaseGameDto,
  playerToUpdate: FirebasePlayerDto,
): Promise<any> {
  const docRef = doc(db, 'games', gameSettingsId);
  const playerToReplace = settings.board.players.find((player) => player.id === playerToUpdate.id);
  return setDoc(
    docRef,
    {
      ...settings,
      board: {
        ...settings.board,
        players: arrayRemove(playerToReplace),
      },
    },
    { merge: true },
  ).then(() => setDoc(
    docRef,
    {
      ...settings,
      board: {
        ...settings.board,
        players: arrayUnion(playerToUpdate),
      },
    },
    { merge: true },
  ));
}

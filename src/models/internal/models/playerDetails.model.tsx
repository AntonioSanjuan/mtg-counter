import { FirebasePlayerDto } from '../../dtos/firebaseStore/firebaseGame.model';

export type PlayerDetailsModel = Pick<FirebasePlayerDto, 'name' | 'deckName'>

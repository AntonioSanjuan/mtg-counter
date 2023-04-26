import { FirebasePlayerDto } from '../../dtos/firebaseStore/firebaseGame.model';

export type PlayerDetailsModel = Pick<FirebasePlayerDto, 'userId' | 'name' | 'deckName'>

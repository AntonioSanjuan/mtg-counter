import { FirebasePlayerDto } from '../../dtos/firebaseStore/firebaseGameSettings.model';

export type PlayerDetailsModel = Pick<FirebasePlayerDto, 'userId' | 'name' | 'deckName'>

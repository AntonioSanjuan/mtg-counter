import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';

export const mapGameFinished = (game: FirebaseGameDto): FirebaseGameDto => ({
  ...game,
  finished: true,
});

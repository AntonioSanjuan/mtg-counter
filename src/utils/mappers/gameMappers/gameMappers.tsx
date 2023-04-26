import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';

export const mapGameFinished = (game: FirebaseGameDto): FirebaseGameDto => ({
  ...game,
  finished: true,
});

import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { Lifes } from '../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';
import { getDefaultPlayers } from '../playerFactory/playerFactory';

export const getNewGame = (
  initialLifes = Lifes.Fourty,
  numberOfPlayers = NumberOfPlayers.Two,
): FirebaseGameDto => ({
  finished: false,
  board: {
    initialLifes,
    numberOfPlayers,
    players: getDefaultPlayers(initialLifes, numberOfPlayers),
  },
});

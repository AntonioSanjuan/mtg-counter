import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';

const isOdd = (data: number): boolean => !!(data % 2);

export const getPlayerRotation = (playerIndex: number, numberOfPlayers: NumberOfPlayers): number => {
  if (!isOdd(playerIndex) && playerIndex + 1 === numberOfPlayers) {
    return 0;
  }
  if (isOdd(playerIndex)) {
    return -90;
  }
  return 90;
};

export const getPlayerHeightPercentage = (numberOfPlayers: NumberOfPlayers): number => {
  switch (numberOfPlayers) {
    case NumberOfPlayers.Two:
      return 100;
    case NumberOfPlayers.Three:
    case NumberOfPlayers.Four:
      return 50;
    case NumberOfPlayers.Five:
    case NumberOfPlayers.Six:
      return 33.33;
    default:
      return 0;
  }
};

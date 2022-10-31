const isOdd = (data: number): boolean => !!(data % 2);

const getPlayerRotation = (playerIndex: number, numberOfPlayers: number): number => {
  if (!isOdd(playerIndex) && playerIndex + 1 === numberOfPlayers) {
    return 0;
  }
  if (isOdd(playerIndex)) {
    return -90;
  }
  return 90;
};

export default getPlayerRotation;

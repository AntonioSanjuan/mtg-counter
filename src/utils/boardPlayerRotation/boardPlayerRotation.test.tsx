import { NumberOfPlayers } from "../../models/internal/types/NumberOfPlayerEnum.model";
import { getPlayerHeightPercentage, getPlayerRotation } from "./boardPlayerRotation";

describe('BoardPlayerRotation', () => {    
    it('getPlayerRotation with 2 players should return the right rotation', () => {
      const numberOfPlayersInput = NumberOfPlayers.Two

      const firstPlayerSut = getPlayerRotation(0, numberOfPlayersInput)
      const secondPlayerSut = getPlayerRotation(1, numberOfPlayersInput)

      expect(firstPlayerSut).toEqual(90)
      expect(secondPlayerSut).toEqual(-90)
    });

    it('getPlayerRotation with 3 players should return the right rotation', () => {
      const numberOfPlayersInput = NumberOfPlayers.Three

      const firstPlayerSut = getPlayerRotation(0, numberOfPlayersInput)
      const secondPlayerSut = getPlayerRotation(1, numberOfPlayersInput)
      const thirdPlayerSut = getPlayerRotation(2, numberOfPlayersInput)

      expect(firstPlayerSut).toEqual(90)
      expect(secondPlayerSut).toEqual(-90)
      expect(thirdPlayerSut).toEqual(0)
    });

    it('getPlayerRotation with 4 players should return the right rotation', () => {
      const numberOfPlayersInput = NumberOfPlayers.Four

      const firstPlayerSut = getPlayerRotation(0, numberOfPlayersInput)
      const secondPlayerSut = getPlayerRotation(1, numberOfPlayersInput)
      const thirdPlayerSut = getPlayerRotation(2, numberOfPlayersInput)
      const fourPlayerSut = getPlayerRotation(3, numberOfPlayersInput)

      expect(firstPlayerSut).toEqual(90)
      expect(secondPlayerSut).toEqual(-90)
      expect(thirdPlayerSut).toEqual(90)
      expect(fourPlayerSut).toEqual(-90)
    });

    it('getPlayerRotation with 5 players should return the right rotation', () => {
      const numberOfPlayersInput = NumberOfPlayers.Five

      const firstPlayerSut = getPlayerRotation(0, numberOfPlayersInput)
      const secondPlayerSut = getPlayerRotation(1, numberOfPlayersInput)
      const thirdPlayerSut = getPlayerRotation(2, numberOfPlayersInput)
      const fourPlayerSut = getPlayerRotation(3, numberOfPlayersInput)
      const fivePlayerSut = getPlayerRotation(4, numberOfPlayersInput)

      expect(firstPlayerSut).toEqual(90)
      expect(secondPlayerSut).toEqual(-90)
      expect(thirdPlayerSut).toEqual(90)
      expect(fourPlayerSut).toEqual(-90)
      expect(fivePlayerSut).toEqual(0)
    });

    it('getPlayerRotation with 6 players should return the right rotation', () => {
      const numberOfPlayersInput = NumberOfPlayers.Six
      
      const firstPlayerSut = getPlayerRotation(0, numberOfPlayersInput)
      const secondPlayerSut = getPlayerRotation(1, numberOfPlayersInput)
      const thirdPlayerSut = getPlayerRotation(2, numberOfPlayersInput)
      const fourPlayerSut = getPlayerRotation(3, numberOfPlayersInput)
      const fivePlayerSut = getPlayerRotation(4, numberOfPlayersInput)
      const sixPlayerSut = getPlayerRotation(5, numberOfPlayersInput)

      expect(firstPlayerSut).toEqual(90)
      expect(secondPlayerSut).toEqual(-90)
      expect(thirdPlayerSut).toEqual(90)
      expect(fourPlayerSut).toEqual(-90)
      expect(fivePlayerSut).toEqual(90)
      expect(sixPlayerSut).toEqual(-90)
    });

    it('getPlayerHeightPercentage with 2 players should return the right height', () => {
      const numberOfPlayersInput = NumberOfPlayers.Two
      
      const heightSut = getPlayerHeightPercentage(numberOfPlayersInput)

      expect(heightSut).toEqual(100)
    });

    it('getPlayerHeightPercentage with 3 players should return the right height', () => {
      const numberOfPlayersInput = NumberOfPlayers.Three
      
      const heightSut = getPlayerHeightPercentage(numberOfPlayersInput)

      expect(heightSut).toEqual(50)
    });

    it('getPlayerHeightPercentage with 3 players should return the right height', () => {
      const numberOfPlayersInput = NumberOfPlayers.Four
      
      const heightSut = getPlayerHeightPercentage(numberOfPlayersInput)

      expect(heightSut).toEqual(50)
    });

    it('getPlayerHeightPercentage with 3 players should return the right height', () => {
      const numberOfPlayersInput = NumberOfPlayers.Five
      
      const heightSut = getPlayerHeightPercentage(numberOfPlayersInput)

      expect(heightSut).toEqual(33.33)
    });

    it('getPlayerHeightPercentage with 3 players should return the right height', () => {
      const numberOfPlayersInput = NumberOfPlayers.Six
      
      const heightSut = getPlayerHeightPercentage(numberOfPlayersInput)

      expect(heightSut).toEqual(33.33)
    });
});
import { FirebaseGameDto } from "../../../models/dtos/firebaseStore/firebaseGameSettings.model";
import { Lifes } from "../../../models/internal/types/LifeEnum.model";
import { NumberOfPlayers } from "../../../models/internal/types/NumberOfPlayerEnum.model";
import { getNewGame } from "../../factories/gameFactory/gameFactory";
import { mapGameFinished } from "./gameMappers";

describe('GameMappers', () => {  
    let sutGame: FirebaseGameDto
    beforeEach(() => {
        sutGame = getNewGame(Lifes.Twenty, NumberOfPlayers.Five);
    });
  
    it('mapGameFinished should return finishedGame game', () => {
        const sut = mapGameFinished(sutGame);

        expect(sutGame.board).toEqual(sut.board)
    });
});
import { FirebaseCounterDto } from "../../../models/dtos/firebaseStore/firebaseGame.model";
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from "../../../models/internal/types/LifeEnum.model";
import { NumberOfPlayers } from "../../../models/internal/types/NumberOfPlayerEnum.model";
import { PlayerColors } from "../../../models/internal/types/PlayerColorEnum.model";
import { GameState } from "../../../state/game/models/appGame.state";
import { getNewGame } from "../../factories/gameFactory/gameFactory";
import { mapGameOwnerPlayerUserName } from "./gameMapper";

describe('GameMappers', () => {  
    let sutGame: GameState;
    let initialLifes: Lifes = Lifes.Twenty

    beforeEach(() => {
        sutGame = getNewGame(initialLifes, NumberOfPlayers.Five);
    });

    it('mapGameOwnerPlayerUserName should keep players', () => {
      const userNameSut = 'userNameTest'  
      const sut = mapGameOwnerPlayerUserName(
            sutGame, 
            userNameSut);

      expect(sut.board.players[0].id).toEqual(sutGame.board.players[0].id)
      expect(sut.board.players[1].id).toEqual(sutGame.board.players[1].id)

    });

    it('mapGameOwnerPlayerUserName should change userId prop of owner player', () => {
      const userNameSut = 'userNameTest'  

      expect(sutGame.board.players[1].owner).toEqual(false)
      expect(sutGame.board.players[0].owner).toEqual(true)

      const sut = mapGameOwnerPlayerUserName(
        sutGame, 
        userNameSut);

      expect(sut.board.players[0].owner).toBeTruthy()
      expect(sut.board.players[0].userId).toEqual(userNameSut)
      expect(sut.board.players[0].name).toEqual(userNameSut)

      expect(sut.board.players[1].owner).toBeFalsy()
      expect(sut.board.players[1].userId).toEqual(null)
      expect(sut.board.players[1].name).toEqual('')

    });



});
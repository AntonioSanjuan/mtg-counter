import { FirebaseCounterDto, FirebaseGameDto } from "../../../models/dtos/firebaseStore/firebaseGameSettings.model";
import { Lifes } from "../../../models/internal/types/LifeEnum.model";
import { NumberOfPlayers } from "../../../models/internal/types/NumberOfPlayerEnum.model";
import { PlayerColors } from "../../../models/internal/types/PlayerColorEnum.model";
import { getNewGame } from "../../factories/gameFactory/gameFactory";
import { mapPlayerColor, mapPlayerCounter } from "./playersMappers";

describe('PlayerMappers', () => {  
    let sutGame: FirebaseGameDto
    beforeEach(() => {
        sutGame = getNewGame(Lifes.Twenty, NumberOfPlayers.Five);
    });
  
    it('mapPlayerColor should return same length of players', () => {
        const sut = mapPlayerColor(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            PlayerColors.green);

        expect(sut.length).toEqual(sutGame.board.players.length)
    });

    it('mapPlayerColor should keep players', () => {
        const sut = mapPlayerColor(
            sutGame.board.players, 
            sutGame.board.players[1].id, 
            PlayerColors.green);

        expect(sut[1].id).toEqual(sutGame.board.players[1].id)
        expect(sut[0].id).toEqual(sutGame.board.players[0].id)
    });

    it('mapPlayerColor should change color of target player', () => {
        const sut = mapPlayerColor(
            sutGame.board.players, 
            sutGame.board.players[1].id, 
            PlayerColors.green);

        expect(sut[1].color).toEqual(PlayerColors.green)
        expect(sut[0].color).toEqual(sutGame.board.players[0].color)
    });


    it('mapPlayerCounter should return same length of counters', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Life"}) as FirebaseCounterDto,
            10);

        expect(sutPlayers[0].counters.length).toEqual(sutGame.board.players[0].counters.length)
    });

    it('mapPlayerCounter should change counter value of target player', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Life"}) as FirebaseCounterDto,
            -10);

            expect(sutPlayers[0].counters.find((counter) => { return counter.type === "Life"})?.value).toEqual(10)
        });
});
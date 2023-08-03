import { FirebaseCounterDto } from "../../../models/dtos/firebaseStore/firebaseGame.model";
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from "../../../models/internal/types/LifeEnum.model";
import { NumberOfPlayers } from "../../../models/internal/types/NumberOfPlayerEnum.model";
import { PlayerColors } from "../../../models/internal/types/PlayerColorEnum.model";
import { GameState } from "../../../state/game/models/appGame.state";
import { getNewGame } from "../../factories/gameFactory/gameFactory";
import { mapPlayerColor, mapPlayerCounter, mapPlayerOwner, mapPlayerUserId, mapPlayerWinner } from "./playersMappers";

describe('PlayerMappers', () => {  
    let sutGame: GameState;
    let initialLifes: Lifes = Lifes.Twenty
    beforeEach(() => {
        sutGame = getNewGame(initialLifes, NumberOfPlayers.Five);
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

    it('mapPlayerOwner should keep players', () => {
        const sut = mapPlayerOwner(
            sutGame.board.players, 
            sutGame.board.players[1].id);

        expect(sut[1].id).toEqual(sutGame.board.players[1].id)
        expect(sut[0].id).toEqual(sutGame.board.players[0].id)
    });

    it('mapPlayerOwner should change owner prop of target player', () => {

        expect(sutGame.board.players[1].owner).toEqual(false)
        expect(sutGame.board.players[0].owner).toEqual(true)

        const sut = mapPlayerOwner(
            sutGame.board.players, 
            sutGame.board.players[1].id);

        expect(sut[1].owner).toEqual(true)
        expect(sut[0].owner).toEqual(false)
    });

    it('mapPlayerUserId should keep players', () => {
        const sut = mapPlayerUserId(
            sutGame.board.players, 
            sutGame.board.players[1].id,
            '');

        expect(sut[1].id).toEqual(sutGame.board.players[1].id)
        expect(sut[0].id).toEqual(sutGame.board.players[0].id)
    });

    it('mapPlayerUserId should change userId prop of target player', () => {
        const userIdSut = 'userIdTest'
        expect(sutGame.board.players[1].owner).toEqual(false)
        expect(sutGame.board.players[0].owner).toEqual(true)

        const sut = mapPlayerUserId(
            sutGame.board.players, 
            sutGame.board.players[1].id,
            userIdSut);

        expect(sut[1].userId).toEqual(userIdSut)
        expect(sut[0].userId).toEqual(null)
    });

    it('mapPlayerWinner should keep players', () => {
        const sut = mapPlayerWinner(
            sutGame.board.players, 
            sutGame.board.players[1].id);

        expect(sut[1].id).toEqual(sutGame.board.players[1].id)
        expect(sut[0].id).toEqual(sutGame.board.players[0].id)
    });

    it('mapPlayerWinner should change color of target player', () => {

        expect(sutGame.board.players[1].winner).toEqual(false)
        expect(sutGame.board.players[0].winner).toEqual(false)

        const sut = mapPlayerWinner(
            sutGame.board.players, 
            sutGame.board.players[1].id);

        expect(sut[1].winner).toEqual(true)
        expect(sut[0].winner).toEqual(false)
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

    it('mapPlayerCounter should set player death to false if counter life value is more than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Life"}) as FirebaseCounterDto,
            - 1);

        expect(sutPlayers[0].death).toBeFalsy()
    });

    it('mapPlayerCounter should set player death to true if counter life value is equal 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Life"}) as FirebaseCounterDto,
            initialLifes * - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });

    it('mapPlayerCounter should set player death to true if counter life value is less than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Life"}) as FirebaseCounterDto,
            (initialLifes * -1) - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });
    
    it('mapPlayerCounter should set player death to false if counter poison value is more than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Poison"}) as FirebaseCounterDto,
            - 1);

        expect(sutPlayers[0].death).toBeFalsy()
    });

    it('mapPlayerCounter should set player death to true if counter poison value is equal 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Poison"}) as FirebaseCounterDto,
            MaxPoisonCounters * - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });

    it('mapPlayerCounter should set player death to true if counter poison value is less than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "Poison"}) as FirebaseCounterDto,
            (MaxPoisonCounters * -1) - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });

    it('mapPlayerCounter should set player death to false if counter CommanderDamage value is more than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "CommanderDamage"}) as FirebaseCounterDto,
            - 1);

        expect(sutPlayers[0].death).toBeFalsy()
    });

    it('mapPlayerCounter should set player death to true if counter CommanderDamage value is equal 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "CommanderDamage"}) as FirebaseCounterDto,
            MaxCommanderDamage * - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });

    it('mapPlayerCounter should set player death to true if counter CommanderDamage value is less than 0', () => {
        const sutPlayers = mapPlayerCounter(
            sutGame.board.players, 
            sutGame.board.players[0].id, 
            sutGame.board.players[0].counters.find((counter) => { return counter.type === "CommanderDamage"}) as FirebaseCounterDto,
            (MaxCommanderDamage * -1) - 1);

        expect(sutPlayers[0].death).toBeTruthy()
    });


});
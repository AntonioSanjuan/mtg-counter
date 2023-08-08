import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';
import { getFinishedGame, getNamedGame, getNewGame, getResizedGame, getRestartedGame } from './gameFactory';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';
import { FirebaseCounterDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';

describe('GameFactory', () => {  
    beforeEach(() => {
    });
  
    it('default getNewGame call should return unfinished game', () => {
        const sut = getNewGame();

        expect(sut.finished).toBeFalsy
    });

    it('default getNewGame call should return 40 life game', () => {
        const sut = getNewGame();

        expect(sut.board.initialLifes).toEqual(Lifes.Fourty)
    });

    it('default getNewGame call should return 2 players game', () => {
        const sut = getNewGame();

        expect(sut.board.numberOfPlayers).toEqual(NumberOfPlayers.Two)
        expect(sut.board.players.length).toEqual(NumberOfPlayers.Two)
    });

    it('getNewGame call with params should return 2 players game', () => {
        const sutLifes = Lifes.Thirty;
        const sutNumberOfPlayers = NumberOfPlayers.Six
        const sut = getNewGame(sutLifes, sutNumberOfPlayers );

        expect(sut.board.initialLifes).toEqual(sutLifes)
        expect(sut.board.numberOfPlayers).toEqual(sutNumberOfPlayers)
        expect(sut.board.players.length).toEqual(sutNumberOfPlayers)
    });

    it('getRestartedGame call should return restarted game', () => {
        const inputGameSut = getNewGame();

        inputGameSut.id = 'gameIdTest',
        inputGameSut.createdAt = new Date()
        inputGameSut.finishAt = new Date()
        inputGameSut.board.players[0].color = PlayerColors.blue;
        inputGameSut.board.players[0].winner = true,
        inputGameSut.board.players[0].name = 'PlayerName0',
        inputGameSut.board.players[0].death = true,
        inputGameSut.board.players[0].counters.map((counter: FirebaseCounterDto) => counter.value = 0)

        const restartedGame = getRestartedGame(inputGameSut)

        expect(restartedGame.id).toEqual(inputGameSut.id)
        expect(restartedGame.createdAt).not.toBe(inputGameSut.createdAt)
        expect(restartedGame.name).toEqual(undefined)
        expect(restartedGame.finishAt).toEqual(undefined)
        expect(restartedGame.finished).toEqual(false)
        expect(restartedGame.board.players[0].color).toEqual(inputGameSut.board.players[0].color)
        expect(restartedGame.board.players[0].winner).toEqual(false)
        expect(restartedGame.board.players[0].death).toEqual(false)
        expect(restartedGame.board.players[0].name).toEqual(inputGameSut.board.players[0].name)
        expect(restartedGame.board.players[0].counters).not.toEqual(inputGameSut.board.players[0].counters)
        expect(restartedGame.board.players[0].counters.find((counter) => counter.type ==="Life")).not.toEqual(inputGameSut.board.initialLifes)
    });

    it('getResizedGame call should return resized game', () => {
        const inputGameSut = getNewGame();
        const inputResizedInitialLifes: Lifes = Lifes.Fourty
        const inputResizedNumberOfPlayers: NumberOfPlayers = NumberOfPlayers.Six
        const inputGameOwnerPlayerUserName: string = 'ownerPlayerUserNameTest'

        inputGameSut.id = 'gameIdTest',
        inputGameSut.createdAt = new Date()
        inputGameSut.finishAt = new Date()
        inputGameSut.board.players[0].color = PlayerColors.blue;
        inputGameSut.board.players[0].winner = true,
        inputGameSut.board.players[0].death = true,
        inputGameSut.board.players[0].name = inputGameOwnerPlayerUserName,
        inputGameSut.board.players[0].userId = inputGameOwnerPlayerUserName,
        inputGameSut.board.players[0].counters.map((counter: FirebaseCounterDto) => counter.value = 0)

        const resizedGame = getResizedGame(
            inputGameSut, 
            inputResizedInitialLifes, 
            inputResizedNumberOfPlayers, 
            inputGameOwnerPlayerUserName
        )

        expect(resizedGame.id).toEqual(inputGameSut.id)
        expect(resizedGame.createdAt).not.toBe(inputGameSut.createdAt)
        expect(resizedGame.name).toEqual(undefined)
        expect(resizedGame.finishAt).toEqual(undefined)
        expect(resizedGame.finished).toEqual(false)
        expect(resizedGame.board.initialLifes).toEqual(inputResizedInitialLifes)
        expect(resizedGame.board.numberOfPlayers).toEqual(inputResizedNumberOfPlayers)

        expect(resizedGame.board.players[0].color).not.toEqual(inputGameSut.board.players[0].color)
        expect(resizedGame.board.players[0].winner).toEqual(false)
        expect(resizedGame.board.players[0].death).toEqual(false)
        expect(resizedGame.board.players[0].name).toEqual(inputGameSut.board.players[0].name)
        expect(resizedGame.board.players[0].userId).toEqual(inputGameSut.board.players[0].userId)
        expect(resizedGame.board.players[0].counters).not.toEqual(inputGameSut.board.players[0].counters)
        expect(resizedGame.board.players[0].counters.find((counter) => counter.type ==="Life")).not.toEqual(inputGameSut.board.initialLifes)
    });

    it('getFinishedGame call should return finised game', () => {
        const inputGameSut = getNewGame();
        
        inputGameSut.id = 'gameIdTest',
        inputGameSut.createdAt = new Date()
        inputGameSut.finished = false;
        inputGameSut.finishAt = undefined
        inputGameSut.board.players[0].color = PlayerColors.blue;
        inputGameSut.board.players[0].winner = true,
        inputGameSut.board.players[0].name = 'PlayerName0',
        inputGameSut.board.players[0].counters.map((counter: FirebaseCounterDto) => counter.value = 0)

        const finishedGame = getFinishedGame(inputGameSut)

        expect(finishedGame.id).toEqual(inputGameSut.id)
        expect(finishedGame.createdAt).toBe(inputGameSut.createdAt)
        expect(finishedGame.name).toEqual(inputGameSut.name)
        expect(finishedGame.finishAt).not.toEqual(inputGameSut.finishAt)
        expect(finishedGame.finished).toEqual(true)
        expect(finishedGame.board.initialLifes).toEqual(inputGameSut.board.initialLifes)
        expect(finishedGame.board.numberOfPlayers).toEqual(inputGameSut.board.numberOfPlayers)

        expect(finishedGame.board.players[0].color).toEqual(inputGameSut.board.players[0].color)
        expect(finishedGame.board.players[0].winner).toEqual(inputGameSut.board.players[0].winner)
        expect(finishedGame.board.players[0].name).toEqual(inputGameSut.board.players[0].name)
        expect(finishedGame.board.players[0].counters).toEqual(inputGameSut.board.players[0].counters)
        expect(finishedGame.board.players[0].counters.find((counter) => counter.type ==="Life"))
        .toEqual(inputGameSut.board.players[0].counters.find((counter) => counter.type ==="Life"))
    });

    it('getNamedGame call should return named game', () => {
        const inputGameSut = getNewGame();
        const inputGameNameSut = 'gameNameTest'
        
        inputGameSut.id = 'gameIdTest',
        inputGameSut.createdAt = new Date()
        inputGameSut.finished = false;
        inputGameSut.finishAt = undefined
        inputGameSut.board.players[0].color = PlayerColors.blue;
        inputGameSut.board.players[0].winner = true,
        inputGameSut.board.players[0].name = 'PlayerName0',
        inputGameSut.board.players[0].counters.map((counter: FirebaseCounterDto) => counter.value = 0)

        const namedGame = getNamedGame(inputGameSut, inputGameNameSut)

        expect(namedGame.id).toEqual(inputGameSut.id)
        expect(namedGame.createdAt).toBe(inputGameSut.createdAt)
        expect(namedGame.name).toEqual(inputGameNameSut)
        expect(namedGame.finishAt).toEqual(inputGameSut.finishAt)
        expect(namedGame.finished).toEqual(inputGameSut.finished)
        expect(namedGame.board.initialLifes).toEqual(inputGameSut.board.initialLifes)
        expect(namedGame.board.numberOfPlayers).toEqual(inputGameSut.board.numberOfPlayers)

        expect(namedGame.board.players[0].color).toEqual(inputGameSut.board.players[0].color)
        expect(namedGame.board.players[0].winner).toEqual(inputGameSut.board.players[0].winner)
        expect(namedGame.board.players[0].name).toEqual(inputGameSut.board.players[0].name)
        expect(namedGame.board.players[0].counters).toEqual(inputGameSut.board.players[0].counters)
        expect(namedGame.board.players[0].counters.find((counter) => counter.type ==="Life"))
        .toEqual(inputGameSut.board.players[0].counters.find((counter) => counter.type ==="Life"))
    });
});
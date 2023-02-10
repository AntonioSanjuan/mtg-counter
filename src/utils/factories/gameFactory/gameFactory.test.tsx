import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';
import { getNewGame } from './gameFactory';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';

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
});
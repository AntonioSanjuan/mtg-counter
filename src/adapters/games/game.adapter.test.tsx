import { Timestamp } from 'firebase/firestore';
import { FirebaseBoardDto, FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameAdapter } from './game.adapter';
import { GameState } from '../../state/game/models/appGame.state';

describe('GameAdapter', () => {    
    it('toState should convert FirebaseGameDto model into GameState model', () => {
      const createdAtSut: Date = new Date()
      const finishedAtSut: Date = createdAtSut
      finishedAtSut.setDate(finishedAtSut.getDate() + 1)

      const inputGameCreatedAtSut: Timestamp = Timestamp.fromDate(createdAtSut)
      const inputGameFinisheddAtSut: Timestamp = Timestamp.fromDate(finishedAtSut)

      const inputGameSut: FirebaseGameDto = {
        name: 'fireBaseGameTest',
        finished: true,
        board: {} as FirebaseBoardDto,
        createdAt: inputGameCreatedAtSut,
        finishAt: inputGameFinisheddAtSut,
      }
      const inputGameIdSut: string = 'gameIdTest'

      const gameState = GameAdapter.toState(inputGameSut, inputGameIdSut)

      expect(gameState.id).toEqual(inputGameIdSut)
      expect(gameState.finished).toEqual(true)
      expect(gameState.board).toEqual(inputGameSut.board)
      expect(gameState.name).toEqual(inputGameSut.name)
      expect(gameState.createdAt).toEqual(createdAtSut)
      expect(gameState.finishAt).toEqual(finishedAtSut)      
    });

    it('toDto should convert GameState model into FirebaseGameDto model', () => {
      const createdAtSut: Date = new Date()
      const finishedAtSut: Date = createdAtSut
      finishedAtSut.setDate(finishedAtSut.getDate() + 1)

      const inputGameCreatedAtSut: Timestamp = Timestamp.fromDate(createdAtSut)
      const inputGameFinisheddAtSut: Timestamp = Timestamp.fromDate(finishedAtSut)

      const inputGameSut: GameState = {
        id: 'gameIdTest',
        name: 'fireBaseGameTest',
        finished: true,
        board: {} as FirebaseBoardDto,
        createdAt: createdAtSut,
        finishAt: finishedAtSut,
      }

      const gameState = GameAdapter.toDto(inputGameSut)

      expect(gameState.finished).toEqual(true)
      expect(gameState.board).toEqual(inputGameSut.board)
      expect(gameState.name).toEqual(inputGameSut.name)
      expect(gameState.createdAt).toEqual(inputGameCreatedAtSut)
      expect(gameState.finishAt).toEqual(inputGameFinisheddAtSut)      
    });
});
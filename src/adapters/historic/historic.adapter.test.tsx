import { Timestamp } from 'firebase/firestore';
import { FirebaseBoardDto, FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { GameState } from '../../state/game/models/appGame.state';
import { HistoricAdapter } from './historic.adapter';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';

describe('HistoricAdapter', () => {    
    it('toState should convert GameState model into HistoricGamesState model', () => {
      const createdAtSut: Date = new Date()
      const finishedAtSut: Date = createdAtSut
      finishedAtSut.setDate(finishedAtSut.getDate() + 1)

      const inputHistoricGameSut: GameState[] = [
        {
          id: 'historicGameIdTest0',
          name: 'fireBaseGameTest0',
          finished: true,
          board: {} as FirebaseBoardDto,
          createdAt: createdAtSut,
          finishAt: finishedAtSut,
        } as GameState
      ]
      const inputGameIdSut: string = 'historicGameIdTest'

      const historicGameState = HistoricAdapter.toState(inputHistoricGameSut, inputGameIdSut)

      expect(historicGameState.id).toEqual(inputGameIdSut)
      expect(historicGameState.games).toEqual(inputHistoricGameSut)    
    });

    it('toDto should convert HistoricGamesState model into FirebaseHistoricGamesDto model', () => {
      const createdAtSut: Date = new Date()
      const finishedAtSut: Date = createdAtSut
      finishedAtSut.setDate(finishedAtSut.getDate() + 1)

      const inputGameHistoricSut: HistoricGamesState = {
        id: 'historicGameIdTest',
        games: [
          {
            id: 'historicGameIdTest0',
            name: 'fireBaseGameTest0',
            finished: true,
            board: {} as FirebaseBoardDto,
            createdAt: createdAtSut,
            finishAt: finishedAtSut,
          } as GameState,
          {
            id: 'historicGameIdTest1',
            name: 'fireBaseGameTest1',
            finished: true,
            board: {} as FirebaseBoardDto,
            createdAt: createdAtSut,
            finishAt: finishedAtSut,
          } as GameState
        ]
      }

      const historicGameState = HistoricAdapter.toDto(inputGameHistoricSut)

      expect(historicGameState.games).toEqual(
        [
          { id: inputGameHistoricSut.games[0].id },
          { id: inputGameHistoricSut.games[1].id }
        ]
      ) 
    });
});
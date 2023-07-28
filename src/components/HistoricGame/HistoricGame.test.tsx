import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import HistoricGame from './HistoricGame';
import { GameState } from '../../state/game/models/appGame.state';
import { FirebaseBoardDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';

describe('HistoricGame', () => {
  let HistoricGameStore: any;
  let history: any;


  beforeEach(() => {
    HistoricGameStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const createddAt = new Date()

    const gameSut = {
      ...getNewGame(),
      name: 'gameName',
      createdAt: createddAt,
    } as GameState;

    const { container } = render(
      <Provider store={HistoricGameStore}>
        <Router location={history.location} navigator={history}>
          <HistoricGame game={gameSut} />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('should show game name if exists', () => {
    const gameNameSut = 'gameName'
    const gameSut = {
      ...getNewGame(),
      name: gameNameSut,
    } as GameState;

    const { container } = render(
      <Provider store={HistoricGameStore}>
        <Router location={history.location} navigator={history}>
          <HistoricGame game={gameSut} />
        </Router>
      </Provider>,
    );

    const durationInMinutesText = screen.queryByText(gameNameSut);

    expect(durationInMinutesText).toBeInTheDocument();
  });
  
  it('if finished should show the duration in minutes of the match', () => {
    const createddAt = new Date('August 19, 1975 23:15:30')
    const finishedAt = new Date('August 19, 1975 23:35:30')
    const durationInMinutes = 20;

    const gameSut = {
      ...getNewGame(),
      name: 'gameName',
      finished: true,
      createdAt: createddAt,
      finishAt:  finishedAt
    } as GameState;
    console.log("🚀 ~ file: HistoricGame.test.tsx:69 ~ it ~ gameSut:", gameSut)

    const { container } = render(
      <Provider store={HistoricGameStore}>
        <Router location={history.location} navigator={history}>
          <HistoricGame game={gameSut} />
        </Router>
      </Provider>,
    );

    const durationInMinutesText = screen.queryByText(durationInMinutes);

    expect(durationInMinutesText).toBeInTheDocument();
  });
});

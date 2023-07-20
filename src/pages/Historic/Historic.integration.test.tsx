import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';

import { setUserSettingsAction } from '../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUser.model';
import HistoricPage from './Historic';
import { setHistoricGamesAction } from '../../state/historicGames/historicGames.actions';
import { HistoricGamesState } from '../../state/historicGames/models/appHistoricGames.state';
import { GameState } from '../../state/game/models/appGame.state';
import { getNewGame } from '../../utils/factories/gameFactory/gameFactory';

describe('Historic', () => {
  let historicStore: any;
  let history: any;

  let gameSut: GameState = getNewGame()

  beforeEach(() => {
    historicStore = createTestStore();
    history = createMemoryHistory();

    gameSut = getNewGame()
    gameSut.id = 'GameIdTest';

    historicStore.dispatch(
      setHistoricGamesAction({ 
        id: "HistoricGamesIdTest",
        games: [ gameSut ]
       } as HistoricGamesState),
    );
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={historicStore}>
        <Router location={history.location} navigator={history}>
          <HistoricPage />
        </Router>
      </Provider>,
    );
    expect(container).toBeDefined();
  });
});

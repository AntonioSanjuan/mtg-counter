import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as alertHooks from '../../../hooks/alert/alertHook';
import * as mock_useAlert from '../../../hooks/alert/alertHook.mock';
import * as playerHooks from '../../../hooks/player/playerHook';
import * as mock_usePlayer from '../../../hooks/player/playerHook.mock';
import { act } from '@testing-library/react-hooks';
import PlayerDetails from './playerDetails';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { getNewGame } from '../../../utils/factories/gameFactory/gameFactory';
import { setGameAction } from '../../../state/game/game.actions';
import { mockFirebaseAuthUser } from '../../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import PlayerOwnerDetailsForm from '../playerOwnerDetailsForm/playerOwnerDetailsForm';
import { FormikProps } from 'formik';
import PlayerGuestDetailsForm from '../playerGuestDetailsForm/playerGuestDetailsForm';

describe('PlayerDetails', () => {
  let playerDetailsStore: any;
  let history: any;
  let inputOwnerPlayer: FirebasePlayerDto;
  let inputNonOwnerPlayer: FirebasePlayerDto;
  const usePlayerPlayersInitialLifes = 40;

  
  beforeEach(() => {
    const usePlayersGame = getNewGame(usePlayerPlayersInitialLifes, 
      NumberOfPlayers.Two);
    const usePlayerplayers = usePlayersGame.board.players
    inputOwnerPlayer = usePlayerplayers[0];
    inputNonOwnerPlayer = usePlayerplayers[1];

    playerDetailsStore = createTestStore();
    history = createMemoryHistory();
    playerDetailsStore.dispatch(
      setGameAction(usePlayersGame)
    )

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);
    jest.spyOn(playerHooks, 'usePlayer')
      .mockImplementation(mock_usePlayer.mock);
    
    mock_useAlert.initializeMock()
    mock_usePlayer.initializeMock()
  });

  it('should create', async () => {
    await act(async () => {
      const { container } = render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerDetails playerId={inputOwnerPlayer.id} />
          </Router>
        </Provider>,
      );

      expect(container).toBeDefined();
    });
  });

  it('owner player details for logged account should shown <PlayerOwnerDetailsForm />', async () => {
    mockFirebaseAuthUser({} as User)

    await act(async () => {
      const { container } = render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerDetails playerId={inputOwnerPlayer.id} />
          </Router>
        </Provider>,
      );
  
      expect(container).toContainHTML(render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerOwnerDetailsForm 
              formik={
                { 
                values: {} as PlayerDetailsModel,
                errors: {},
                touched: {}
                } as FormikProps<PlayerDetailsModel>
              }
            />
            </Router>
        </Provider>,
      ).container.innerHTML)  
    })
  });

  it('owner player details for not logged account should shown <PlayerGuestDetailsForm />', async () => {
    mockFirebaseAuthUser(undefined)

    await act(async () => {
      const { container } = render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerDetails playerId={inputOwnerPlayer.id} />
          </Router>
        </Provider>,
      );
  
      expect(container).toContainHTML(render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerGuestDetailsForm 
              formik={
                { 
                values: {} as PlayerDetailsModel,
                errors: {},
                touched: {}
                } as FormikProps<PlayerDetailsModel>
              }
              playerUserId={inputOwnerPlayer.userId}
              save={() => {}}
            />
            </Router>
        </Provider>,
      ).container.innerHTML)  
    })
  });

  it('not owner player details for logged account should shown <PlayerGuestDetailsForm />', async () => {
    mockFirebaseAuthUser({} as User)

    await act(async () => {
      const { container } = render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerDetails playerId={inputNonOwnerPlayer.id} />
          </Router>
        </Provider>,
      );
  
      expect(container).toContainHTML(render(
        <Provider store={playerDetailsStore}>
          <Router location={history.location} navigator={history}>
            <PlayerGuestDetailsForm 
              formik={
                { 
                values: {} as PlayerDetailsModel,
                errors: {},
                touched: {}
                } as FormikProps<PlayerDetailsModel>
              }
              playerUserId={inputNonOwnerPlayer.userId}
              save={() => {}}
            />
            </Router>
        </Provider>,
      ).container.innerHTML)  
    })
  });
});

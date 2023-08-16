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
import { getDefaultPlayers } from '../../../utils/factories/playerFactory/playerFactory';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { getNewGame } from '../../../utils/factories/gameFactory/gameFactory';
import { setGameAction } from '../../../state/game/game.actions';
import { mockFirebaseAuthUser } from '../../../utils/testsUtils/firebaseAuth.util';
import { User } from 'firebase/auth';
import PlayerOwnerDetailsForm from '../playerOwnerDetailsForm/playerOwnerDetailsForm';
import { FormikProps } from 'formik';

describe('PlayerDetails', () => {
  let playerDetailsStore: any;
  let history: any;
  let inputPlayer: FirebasePlayerDto;
  const usePlayerPlayersInitialLifes = 40;

  beforeEach(() => {
    const usePlayersGame = getNewGame(usePlayerPlayersInitialLifes, 
      NumberOfPlayers.Two);
    const usePlayerplayers = usePlayersGame.board.players
    inputPlayer = usePlayerplayers[0];

    playerDetailsStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(alertHooks, 'useAlert')
      .mockImplementation(mock_useAlert.mock);
    jest.spyOn(playerHooks, 'usePlayer')
      .mockImplementation(mock_usePlayer.mock);
    
    playerDetailsStore.dispatch(
      setGameAction(usePlayersGame)
    )
    
    mock_useAlert.initializeMock()
    mock_usePlayer.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={playerDetailsStore}>
        <Router location={history.location} navigator={history}>
          <PlayerDetails playerId={inputPlayer.id} />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('owner player details for logged account should shown <PlayerOwnerDetailsForm />', () => {
    mockFirebaseAuthUser({} as User)
    const { container } = render(
      <Provider store={playerDetailsStore}>
        <Router location={history.location} navigator={history}>
          <PlayerDetails playerId={inputPlayer.id} />
        </Router>
      </Provider>,
    );


    expect(container).toContainHTML(render(
      <Provider store={playerDetailsStore}>
        <Router location={history.location} navigator={history}>
          <PlayerOwnerDetailsForm />
          </Router>
      </Provider>,
    ).container.innerHTML)  });

  // it('initially submit button should be disabled', async () => {
  //   render(
  //     <Provider store={playerDetailsStore}>
  //       <Router location={history.location} navigator={history}>
  //       <PlayerDetails player={inputPlayer} />
  //       </Router>
  //     </Provider>,
  //   );

  //   const saveDetailsButton = screen.getByRole('button', { name: 'Save details' });
  //   expect(saveDetailsButton).toBeDisabled();

  // });

  // it('userId input should be disabled', async () => {
  //   render(
  //     <Provider store={modalStore}>
  //       <Router location={history.location} navigator={history}>
  //           <PlayerDetails player={inputPlayer} />
  //       </Router>
  //     </Provider>,
  //   );

  //   const deckNameInput = screen.getByPlaceholderText(/rubio#1234/i);
  //   expect(deckNameInput).toBeDisabled();
  // });

  // it('submit button should be disabled until form is touched', async () => {
  //   render(
  //     <Provider store={playerDetailsStore}>
  //       <Router location={history.location} navigator={history}>
  //       <PlayerDetails player={inputPlayer} />
  //       </Router>
  //     </Provider>,
  //   );

  //   const saveDetailsButton = screen.getByRole('button', { name: 'Save details' });
  //   expect(saveDetailsButton).toBeDisabled();

  //   const deckNameInput = screen.getByPlaceholderText(/Pium! Pium!/i);

  //   await act(async () => {
  //       fireEvent.change(deckNameInput, { target: { value: 'testDeckName' } });    
  //   });

  //   expect(saveDetailsButton).not.toBeDisabled();
  // });

  // it('form should be filled with playerDetails data', async () => {
  //   const playerNameSut: string = 'testName';
  //   const playerDeckNameSut: string = 'testDeckName'

  //   const playerSut: FirebasePlayerDto = {
  //       ...inputPlayer,
  //       name: playerNameSut,
  //       userId: null,
  //       deckName: playerDeckNameSut
  //   }
  //   render(
  //     <Provider store={playerDetailsStore}>
  //       <Router location={history.location} navigator={history}>
  //         <PlayerDetails player={playerSut} />
  //       </Router>
  //     </Provider>,
  //   );

  //   const deckNameInput = screen.getByPlaceholderText<HTMLInputElement>("Pium! Pium!");
  //   const nameInput = screen.getByPlaceholderText<HTMLInputElement>("rubio");

  //   expect(nameInput.value).toBe(playerNameSut)
  //   expect(deckNameInput.value).toBe(playerDeckNameSut)
  // });

  // it('submit should request updatePlayerDetails', async () => {
  //   const playerDeckName = 'testDeckName'
  //   render(
  //     <Provider store={playerDetailsStore}>
  //       <Router location={history.location} navigator={history}>
  //         <PlayerDetails player={inputPlayer} />
  //       </Router>
  //     </Provider>,
  //   );

  //   const saveDetailsButton = screen.getByRole('button', { name: 'Save details' });

  //   const deckNameInput = screen.getByPlaceholderText(/Pium! Pium!/i);

  //   await act(async () => {
  //       fireEvent.change(deckNameInput, { target: { value: playerDeckName } });    
  //   });

  //   await act(async () => {
  //     saveDetailsButton.click()
  //   });

  //   const sut: PlayerDetailsModel = {
  //     deckName: playerDeckName,
  //     name: "",
  //     userId: ""
  //   }
  //   expect(mock_usePlayer.mock().updatePlayerDetails).toHaveBeenCalledWith(sut)

  // });
});

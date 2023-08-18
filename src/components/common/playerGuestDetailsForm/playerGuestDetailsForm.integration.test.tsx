import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as usersHooks from '../../../hooks/users/usersHook';
import * as mock_useUsers from '../../../hooks/users/usersHook.mock';
import { act } from '@testing-library/react-hooks';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { getNewGame } from '../../../utils/factories/gameFactory/gameFactory';
import { FormikProps } from 'formik';
import PlayerGuestDetailsForm from './playerGuestDetailsForm';
import PlayerGuestLinkedDetailsForm from '../playerGuestLinkedDetailsForm/playerGuestLinkedDetailsForm';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import PlayerGuestLinkForm from '../playerGuestLinkForm/playerGuestLinkForm';

describe('PlayerGuestDetailsForm', () => {
  let playerGuestDetailsFormStore: any;
  let history: any;
  let inputUserIdPlayer: FirebasePlayerDto;
  let inputNonUserIdPlayer: FirebasePlayerDto;
  const usePlayerPlayersInitialLifes = 40;
  let formik: FormikProps<PlayerDetailsModel>
  
  beforeEach(() => {
    const usePlayersGame = getNewGame(usePlayerPlayersInitialLifes, 
      NumberOfPlayers.Two);
    const usePlayerplayers = usePlayersGame.board.players
    inputUserIdPlayer = usePlayerplayers[0];
    inputNonUserIdPlayer = usePlayerplayers[1];

    playerGuestDetailsFormStore = createTestStore();
    history = createMemoryHistory();

    formik = { 
      values: {} as PlayerDetailsModel,
      errors: {},
      touched: {},
      } as FormikProps<PlayerDetailsModel>

    jest.spyOn(usersHooks, 'useUsers')
      .mockImplementation(mock_useUsers.mock);
    
    mock_useUsers.initializeMock()
  });

  // it('should create', async () => {
  //   const userIdSut = "userIdTest"

  //   await act(async () => {
  //     const { container } = render(
  //       <Provider store={playerGuestDetailsFormStore}>
  //         <Router location={history.location} navigator={history}>
  //           <PlayerGuestDetailsForm 
  //           save={() => {}}
  //           formik={formik}
  //           playerUserId={userIdSut} />
  //         </Router>
  //       </Provider>,
  //     );

  //     expect(container).toBeDefined();
  //   });
  // });

  // it('initially should not request getUserByUserNameDecks if form has userId', async () => {
  //   const saveSpy = jest.fn()
  //   const userIdSut = "userIdTest"
    
  //   expect(mock_useUsers.mock().getUserByUserNameDecks).not.toHaveBeenCalled()
  //   await act(async () => {
  //     const { container } = render(
  //       <Provider store={playerGuestDetailsFormStore}>
  //         <Router location={history.location} navigator={history}>
  //           <PlayerGuestDetailsForm 
  //           save={() => {}}
  //           formik={formik}
  //           playerUserId={userIdSut} />
  //         </Router>
  //       </Provider>,
  //     );
  //   });
  //   expect(mock_useUsers.mock().getUserByUserNameDecks).not.toHaveBeenCalled()
  //   expect(saveSpy).not.toHaveBeenCalled()
  // });

  // it('initially should request getUserByUserNameDecks if form has userId', async () => {
  //   const saveSpy = jest.fn()
  //   const userIdSut = "userIdTest"
  //   const formikWithUserId = {
  //     ...formik,
  //     values: {
  //       ...formik.values,
  //       userId: userIdSut
  //     }
  //   } as FormikProps<PlayerDetailsModel>

  //   expect(mock_useUsers.mock().getUserByUserNameDecks).not.toHaveBeenCalled()
  //   await act(async () => {
  //     const { container } = render(
  //       <Provider store={playerGuestDetailsFormStore}>
  //         <Router location={history.location} navigator={history}>
  //           <PlayerGuestDetailsForm 
  //           save={saveSpy}
  //           formik={formikWithUserId}
  //           playerUserId={userIdSut} />
  //         </Router>
  //       </Provider>,
  //     );
  //   });
  //   expect(mock_useUsers.mock().getUserByUserNameDecks).toHaveBeenCalledWith(userIdSut)
  //   expect(saveSpy).not.toHaveBeenCalled()
  // });

  it('linked player should shown <PlayerGuestLinkedDetailsForm />', async () => {
    const userIdSut = "userIdTest"
    const formikWithUserId = {
      ...formik,
      values: {
        ...formik.values,
        userId: userIdSut
      }
    } as FormikProps<PlayerDetailsModel>

    const getUserByUserNameDecksResponse = {
      decks: [] as FirebaseDeckDto[]
    } as DeckCollectionState

    mock_useUsers.mock().getUserByUserNameDecks.mockResolvedValue(getUserByUserNameDecksResponse)
    
    await act(async () => {
      const { container } = render(
        <Provider store={playerGuestDetailsFormStore}>
          <Router location={history.location} navigator={history}>
            <PlayerGuestDetailsForm 
            save={() => {}}
            formik={formikWithUserId}
            playerUserId={userIdSut} />
          </Router>
        </Provider>,
      );

      await waitFor(() => 
        expect(container).toContainHTML(render(
          <Provider store={playerGuestDetailsFormStore}>
            <Router location={history.location} navigator={history}>
              <PlayerGuestLinkedDetailsForm 
                formik={
                  { 
                  values: {} as PlayerDetailsModel,
                  errors: {},
                  touched: {}
                  } as FormikProps<PlayerDetailsModel>
                }
                playerDeckCollection={getUserByUserNameDecksResponse}
                unLinkPlayer={() => {}}
              />
              </Router>
          </Provider>,
        ).container.innerHTML) 
      )
    });
  });

  it('not linked player should shown <PlayerGuestLinkForm />', async () => {
    const userIdSut = "userIdTest"
    const formikWithUserId = {
      ...formik,
      values: {
        ...formik.values,
        userId: null
      }
    } as FormikProps<PlayerDetailsModel>

    const getUserByUserNameDecksResponse = {
      decks: [] as FirebaseDeckDto[]
    } as DeckCollectionState

    mock_useUsers.mock().getUserByUserNameDecks.mockResolvedValue(getUserByUserNameDecksResponse)
    
    await act(async () => {
      const { container } = render(
        <Provider store={playerGuestDetailsFormStore}>
          <Router location={history.location} navigator={history}>
            <PlayerGuestDetailsForm 
            save={() => {}}
            formik={formikWithUserId}
            playerUserId={userIdSut} />
          </Router>
        </Provider>,
      );

      await waitFor(() => 
        expect(container).toContainHTML(render(
          <Provider store={playerGuestDetailsFormStore}>
            <Router location={history.location} navigator={history}>
              <PlayerGuestLinkForm 
                formik={
                  { 
                  values: {} as PlayerDetailsModel,
                  errors: {},
                  touched: {}
                  } as FormikProps<PlayerDetailsModel>
                }
                linkPlayer={() => {}}
              />
              </Router>
          </Provider>,
        ).container.innerHTML) 
      )
    });
  });
});

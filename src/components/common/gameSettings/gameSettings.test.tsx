import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { act } from '@testing-library/react-hooks';
import GameSettings from './gameSettings';
import { useGameSettingsMock } from '../../../hooks/gameSettings/gameSettingsHook.mock';
import * as useGameSettings from './../../../hooks/gameSettings/gameSettingsHook';
import { Lifes } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { getDefaultPlayerCounters, getDefaultPlayers } from '../../../utils/playerFactory/playerFactory';
import { FirebaseGameDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';
import { setGameSettingsAction } from '../../../state/game/game.actions';

describe('GameSettings', () => {
  let gameSettingsStore: any;
  let history: any;

  beforeEach(() => {
    gameSettingsStore = createTestStore();
    history = createMemoryHistory();

    jest.spyOn(useGameSettings, 'useGameSettings')
        .mockImplementation(useGameSettingsMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('change InitialLifes should request to updateGameSettings', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(useGameSettingsMock().updateGameSettings).not.toHaveBeenCalled()

    const languageSelect = screen.getByLabelText('InitialLifes');
   
    
    await act(async () => {
        fireEvent.change(languageSelect, { target: { value: Lifes.Twenty } })
    });

    expect(useGameSettingsMock().updateGameSettings).toHaveBeenCalled()
  });

  it('change NumberOfPlayers should request to updateGameSettings', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    expect(useGameSettingsMock().updateGameSettings).not.toHaveBeenCalled()

    const numberOFPlayersSelect = screen.getByLabelText('NumberOfPlayers');
   
    
    await act(async () => {
        fireEvent.change(numberOFPlayersSelect, { target: { value: NumberOfPlayers.Six } })
    });

    expect(useGameSettingsMock().updateGameSettings).toHaveBeenCalled()
  });

  it('Restart should restart only the players counters', async () => {
    render(
      <Provider store={gameSettingsStore}>
        <Router location={history.location} navigator={history}>
          <GameSettings />
        </Router>
      </Provider>,
    );

    const playersLife = Lifes.Thirty
    let players: FirebasePlayerDto[] = getDefaultPlayers(playersLife, 3);
    const gameSettings: FirebaseGameDto = { 
      finished: false,
      board: {
        players: players,
        initialLifes: playersLife,
        numberOfPlayers: players.length
      }
    };

    //sut
    gameSettings.board.players[0].color = PlayerColors.blue;
    gameSettings.board.players[0].counters.map((counter) => {
      if(counter.type === 'Life') {
        counter.value = 1;
      }
    });

    

    await act(async () => {
      gameSettingsStore.dispatch(setGameSettingsAction(gameSettings));
    });

    expect(useGameSettingsMock().updateGameSettings).not.toHaveBeenCalled()

    const button = screen.getByRole('button', { name: 'restartGameSettings' });
    
    await act(async () => {
      fireEvent.click(button);
    });

    const restartedGameSettings = {
      ...gameSettings,
      board: {
        ...gameSettings.board,
        players: gameSettings.board.players.map((player) => {
          return {
            ...player,
            counters: getDefaultPlayerCounters(playersLife)
          }
        })
      }
    }

    expect(useGameSettingsMock().updateGameSettings).toHaveBeenCalledWith(restartedGameSettings)
  });
});

import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import * as usePlayerHooks from '../../hooks/player/playerHook'
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import ColorPicker from './ColorPicker';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { getDefaultPlayers } from '../../utils/factories/playerFactory/playerFactory';
import * as mock_usePlayer from '../../hooks/player/playerHook.mock';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { act } from 'react-dom/test-utils';

describe('ColorPicker', () => {
  let colorPickerStore: any;
  let history: any;

  let inputPlayer: FirebasePlayerDto;

  beforeEach(() => {
    colorPickerStore = createTestStore();
    history = createMemoryHistory();

    inputPlayer = getDefaultPlayers(40, 1)[0];


    jest.spyOn(usePlayerHooks, 'usePlayer')
      .mockImplementation(mock_usePlayer.mock);

      mock_usePlayer.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer}  onPick={() => {}}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('ColorSelector select should request to updatePlayerColor', async () => {
    const onPickFn = jest.fn()
    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} onPick={onPickFn} />
        </Router>
      </Provider>,
    );
    expect(mock_usePlayer.mock().updatePlayerColor).not.toHaveBeenCalled()
    expect(onPickFn).not.toHaveBeenCalled()
    
    const colorButton = screen.getByRole('button', { name: PlayerColors.green });

    await act(async () => {
      fireEvent.click(colorButton);
    });

    expect(mock_usePlayer.mock().updatePlayerColor).toHaveBeenCalled()
    expect(onPickFn).toHaveBeenCalled()
  });

  it('ColorSelector select should not show player color', async () => {
    expect(mock_usePlayer.mock().updatePlayerColor).not.toHaveBeenCalled()

    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} onPick={() => {}}/>
        </Router>
      </Provider>,
    );
    const colorButton = screen.queryByRole('button', { name: inputPlayer.color });

    expect(colorButton).not.toBeInTheDocument()
    expect(mock_usePlayer.mock().updatePlayerColor).not.toHaveBeenCalled()
  });
});

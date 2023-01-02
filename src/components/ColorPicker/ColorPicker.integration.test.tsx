import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import * as usePlayerHooks from '../../hooks/player/playerHook'
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import ColorPicker from './ColorPicker';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';
import { usePlayerMock } from '../../hooks/player/playerHook.mock';
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
      .mockImplementation(usePlayerMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('ColorSelector select should request to updatePlayerColor if selected color is not equal to playerColor', async () => {
    expect(usePlayerMock().updatePlayerColor).not.toHaveBeenCalled()

    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} />
        </Router>
      </Provider>,
    );
    const colorButton = screen.getByRole('button', { name: PlayerColors.green });

    await act(async () => {
      fireEvent.click(colorButton);
    });

    expect(usePlayerMock().updatePlayerColor).toHaveBeenCalled()
  });

  it('ColorSelector select should not show player color', async () => {
    expect(usePlayerMock().updatePlayerColor).not.toHaveBeenCalled()

    const { container } = render(
      <Provider store={colorPickerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} />
        </Router>
      </Provider>,
    );
    const colorButton = screen.queryByRole('button', { name: inputPlayer.color });

    expect(colorButton).not.toBeInTheDocument()
    expect(usePlayerMock().updatePlayerColor).not.toHaveBeenCalled()
  });
});

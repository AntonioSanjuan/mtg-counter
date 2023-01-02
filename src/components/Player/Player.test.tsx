import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { act } from 'react-dom/test-utils';
import * as useCounterHooks from '../../hooks/counter/counterHook'
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { useCounterMock } from '../../hooks/counter/counterHook.mock';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';
import Player from './Player';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import ColorPicker from '../ColorPicker/ColorPicker';

describe('Player', () => {
  let playerStore: any;
  let history: any;

  let inputPlayer: FirebasePlayerDto;


  beforeEach(() => {
    playerStore = createTestStore();
    history = createMemoryHistory();

    inputPlayer = getDefaultPlayers(40, 1)[0];
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <Player player={inputPlayer} rotation={0}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('if configButton has not been pressed, should render CounterCarrousel component', () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <Player player={inputPlayer} rotation={0}/>
        </Router>
      </Provider>,
    );
    expect(container.childElementCount).toEqual(1)
    expect(container).toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false}/>
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('if configButton has been pressed, should render ColorPicker component', async () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <Player player={inputPlayer} rotation={0}/>
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'configButton' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(container).toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <ColorPicker player={inputPlayer} />
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('if rotation is different than 0, CounterCarrousel should be rotated', () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <Player player={inputPlayer} rotation={90}/>
        </Router>
      </Provider>,
    );
    expect(container.childElementCount).toEqual(1)
    expect(container).toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={true}/>
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('if rotation is equal to 0, CounterCarrousel should not be rotated', () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <Player player={inputPlayer} rotation={0}/>
        </Router>
      </Provider>,
    );
    expect(container.childElementCount).toEqual(1)
    expect(container).toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false}/>
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  
});

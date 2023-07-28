import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { act } from 'react-dom/test-utils';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { getDefaultPlayers } from '../../utils/factories/playerFactory/playerFactory';
import { NumberOfPlayers } from '../../models/internal/types/NumberOfPlayerEnum.model';
import MinifiedPlayer from './MinifiedPlayer';
import * as playerHooks from '../../hooks/player/playerHook';
import * as mock_usePlayer from '../../hooks/player/playerHook.mock';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';

describe('MinifiedPlayer', () => {
  let playerStore: any;
  let history: any;

  let inputPlayer: FirebasePlayerDto;


  beforeEach(() => {
    playerStore = createTestStore();
    history = createMemoryHistory();

    inputPlayer = getDefaultPlayers(40, NumberOfPlayers.Two)[0];

    jest.spyOn(playerHooks, 'usePlayer')
      .mockImplementation(mock_usePlayer.mock);

    mock_usePlayer.initializeMock()
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedPlayer player={inputPlayer} showWinner={false} winnerSelection={false}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('if winnerSelection is true and component is clicked should request updatePlayerWinner from usePlayer hook', async () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedPlayer player={inputPlayer} showWinner={false} winnerSelection={true}/>
        </Router>
      </Provider>,
    );
    const button = screen.getByRole('button', { name: 'minifiedPlayer' });

    await act(async () => {
      fireEvent.click(button);
    });  

    expect(mock_usePlayer.mock().updatePlayerWinner).toHaveBeenCalled()
  });

  it('if winnerSelection is false and component is clicked should not request updatePlayerWinner from usePlayer hook', async () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedPlayer player={inputPlayer} showWinner={false} winnerSelection={false}/>
        </Router>
      </Provider>,
    );
    const button = screen.getByRole('button', { name: 'minifiedPlayer' });

    await act(async () => {
      fireEvent.click(button);
    });  

    expect(mock_usePlayer.mock().updatePlayerWinner).not.toHaveBeenCalled()
  });


  it('if showWinner is false should appear CounterCarrousel component', async () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedPlayer player={inputPlayer} showWinner={false} winnerSelection={false}/>
        </Router>
      </Provider>,
    );

    expect(container).toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false} isResume/>
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

  it('if showWinner is true should not appear CounterCarrousel component', async () => {
    const { container } = render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <MinifiedPlayer player={inputPlayer} showWinner={true} winnerSelection={false}/>
        </Router>
      </Provider>,
    );

    expect(container).not.toContainHTML(render(
      <Provider store={playerStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false} isResume/>
        </Router>
      </Provider>,
    ).container.innerHTML)
  });

});

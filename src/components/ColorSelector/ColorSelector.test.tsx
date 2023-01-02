import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { act } from 'react-dom/test-utils';
import ColorSelector from './ColorSelector';

describe('ColorSelector', () => {
  let colorSelectorStore: any;
  let history: any;


  beforeEach(() => {
    colorSelectorStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const onSelectSpy = jest.fn()

    const { container } = render(
      <Provider store={colorSelectorStore}>
        <Router location={history.location} navigator={history}>
          <ColorSelector color={PlayerColors.blue} onSelect={() => {onSelectSpy()}}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('button onClick should request to onSelect output function', async () => {
    const inputColor = PlayerColors.blue;
    const onSelectSpy = jest.fn((color: PlayerColors) => {})

    const { container } = render(
      <Provider store={colorSelectorStore}>
        <Router location={history.location} navigator={history}>
          <ColorSelector color={inputColor} onSelect={onSelectSpy}/>
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: inputColor });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(onSelectSpy).toHaveBeenCalledWith(inputColor)
  });

});

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import * as alertHooks from '../../../hooks/alert/alertHook';
import { useAlertMock } from '../../../hooks/alert/alertHook.mock';
import { act } from '@testing-library/react-hooks';
import { SearchInput } from './searchInput';

describe('SearchInput', () => {
  let searchInputStore: any;
  let history: any;

  let callbackFn = jest.fn()

  beforeEach(() => {
    searchInputStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={searchInputStore}>
        <Router location={history.location} navigator={history}>
          <SearchInput onSearch={callbackFn}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('search should empty inputText and send the value to onSearch', async () => {
    const sut = 'TestingText'
    render(
      <Provider store={searchInputStore}>
        <Router location={history.location} navigator={history}>
          <SearchInput onSearch={callbackFn}/>
        </Router>
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: sut } });

    const openCloseButton = screen.getByRole('button', { name: 'SearchInput SearchButton' });

    await act(async () => {
      fireEvent.click(openCloseButton);
    });
    
    expect(callbackFn).toHaveBeenCalledWith(sut)
  });
});

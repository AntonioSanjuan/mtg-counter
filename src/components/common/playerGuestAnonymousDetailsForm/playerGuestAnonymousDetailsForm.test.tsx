import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { act } from '@testing-library/react-hooks';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { FormikProps } from 'formik';
import PlayerGuestAnonymousDetailsForm from './playerGuestAnonymousDetailsForm';

describe('PlayerGuestAnonymousDetailsForm', () => {
  let playerGuestAnonymousDetailsFormStore: any;
  let history: any;

  
  beforeEach(() => {
    playerGuestAnonymousDetailsFormStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', async () => {
    const { container } = render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={
              { 
              values: {} as PlayerDetailsModel,
              errors: {},
              touched: {},
              } as FormikProps<PlayerDetailsModel>
            } />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('should create', async () => {
    const { container } = render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={
              { 
              values: {} as PlayerDetailsModel,
              errors: {},
              touched: {},
              } as FormikProps<PlayerDetailsModel>
            } />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});

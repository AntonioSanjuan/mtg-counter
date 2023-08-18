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
  let formik: FormikProps<PlayerDetailsModel>
  
  beforeEach(() => {
    playerGuestAnonymousDetailsFormStore = createTestStore();
    history = createMemoryHistory();
    formik = { 
      values: {} as PlayerDetailsModel,
      errors: {},
      touched: {},
      } as FormikProps<PlayerDetailsModel>
  });

  it('should create', async () => {
    const { container } = render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={formik} />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('form submit should be available if form is valid & dirty', async () => {
    render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={
              { 
              values: {
              } as PlayerDetailsModel,
              errors: {},
              touched: {},
              dirty: true,
              isValid: true
              } as FormikProps<PlayerDetailsModel>
            } />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'PlayerGuestAnonymousDetailsFormSubmit' });

    expect(submitButton).not.toBeDisabled()
  });

  it('form submit should be not available if form is !valid & dirty', async () => {
    render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={
              { 
              values: {
              } as PlayerDetailsModel,
              errors: {},
              touched: {},
              dirty: true,
              isValid: false
              } as FormikProps<PlayerDetailsModel>
            } />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'PlayerGuestAnonymousDetailsFormSubmit' });

    expect(submitButton).toBeDisabled()
  });

  it('form submit should be not available if form is valid & !dirty', async () => {
    render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={
              { 
              values: {
              } as PlayerDetailsModel,
              errors: {},
              touched: {},
              dirty: false,
              isValid: true
              } as FormikProps<PlayerDetailsModel>
            } />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'PlayerGuestAnonymousDetailsFormSubmit' });

    expect(submitButton).toBeDisabled()
  });

  it('form submit should be not available if form is valid & !dirty', async () => {
    render(
      <Provider store={playerGuestAnonymousDetailsFormStore}>
        <Router location={history.location} navigator={history}>
          <PlayerGuestAnonymousDetailsForm              
            formik={formik} />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: 'PlayerGuestAnonymousDetailsFormSubmit' });

    expect(submitButton).toBeDisabled()
  });
});

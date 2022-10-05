import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';

import HomePage from './SettingsButtons';

import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import SettingButton from './SettingsButtons';

describe('HomePage', () => {
  let settingButtonStore: any;
  let history: any;

  beforeEach(() => {
    settingButtonStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={settingButtonStore}>
        <Router location={history.location} navigator={history}>
          <SettingButton />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});

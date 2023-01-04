import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createTestStore } from '../../../utils/testsUtils/createTestStore.util';
import { Section } from './section';
import { act } from '@testing-library/react-hooks';

describe('Section', () => {
  let sectionStore: any;
  let history: any;

  let callbackFn = jest.fn()

  beforeEach(() => {
    sectionStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={sectionStore}>
        <Router location={history.location} navigator={history}>
          <Section
            sectionName="Test SectionName"
            onClickCallback={callbackFn}>
            <p>test</p>
          </Section>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('section click should call to callback function', async () => {
    const { container } = render(
      <Provider store={sectionStore}>
        <Router location={history.location} navigator={history}>
          <Section
            sectionName="Test SectionName"
            onClickCallback={callbackFn}>
            <p>test</p>
          </Section>
        </Router>
      </Provider>,
    );
    expect(callbackFn).not.toHaveBeenCalled()
    const button = screen.getByRole('button', { name: 'SectionButton' });

    await act(async () => {
      fireEvent.click(button);
    });
    
    expect(callbackFn).toHaveBeenCalled()

  });
});

import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import CounterCarrouselItem from './CounterCarrouselItem';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { CounterTypes } from '../../models/internal/types/CounterTypes.model';

describe('CounterCarrouselItem', () => {
  let counterCarrouselItemStore: any;
  let history: any;


  beforeEach(() => {
    counterCarrouselItemStore = createTestStore();
    history = createMemoryHistory();
  });

  it('should create', () => {
    const counterSut: FirebaseCounterDto = {
      type: "Life",
      targetPlayerId: 'targetPlayerIdTest',
      value: 10
    }
    // const counterOpponentSut = {
    //   name: 'counterOpponentNameTest',
    //   color: PlayerColors.green
    // } as FirebasePlayerDto;

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
          playerColor={PlayerColors.blue} 
          counter={counterSut}
          // counterOpponent={counterOpponentSut}
          />
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('CounterType Life should show counter value ', () => {
    const counterTypeSut: CounterTypes = "Life"
    const counterValueSut = 99
    const counterSut: FirebaseCounterDto = {
      type:counterTypeSut,
      targetPlayerId: 'targetPlayerIdTest',
      value: counterValueSut
    }

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
          playerColor={PlayerColors.blue} 
          counter={counterSut}
          />
        </Router>
      </Provider>,
    );

    const counterValueText = screen.queryByText(counterValueSut);
    expect(counterValueText).toBeInTheDocument()
  });

  it('CounterType Poison should show counter value ', () => {
    const counterTypeSut: CounterTypes = "Poison"
    const counterValueSut = 99
    const counterSut: FirebaseCounterDto = {
      type:counterTypeSut,
      targetPlayerId: 'targetPlayerIdTest',
      value: counterValueSut
    }

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
          playerColor={PlayerColors.blue} 
          counter={counterSut}
          />
        </Router>
      </Provider>,
    );

    const counterValueText = screen.queryByText(counterValueSut);
    expect(counterValueText).toBeInTheDocument()
  });

  it('CounterType CommanderDamage should show counter value ', () => {
    const counterTypeSut: CounterTypes = "CommanderDamage"
    const counterValueSut = 99
    const counterSut: FirebaseCounterDto = {
      type:counterTypeSut,
      targetPlayerId: 'targetPlayerIdTest',
      value: counterValueSut
    }

    const counterOpponentSut = {
      name: 'counterOpponentNameTest',
      color: PlayerColors.green
    } as FirebasePlayerDto;

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
          playerColor={PlayerColors.blue} 
          counter={counterSut}
          counterOpponent={counterOpponentSut}
          />
        </Router>
      </Provider>,
    );

    const counterValueText = screen.queryByText(counterValueSut);
    expect(counterValueText).toBeInTheDocument()
  });

  it('CounterType Life should not show counter opponent name ', () => {
    const counterTypeSut: CounterTypes = "Life"
    const counterOpponentNameSut = "counterOpponentNameTest"
    const counterOpponentId = 'counterOpponentIdTest'

    const counterSut: FirebaseCounterDto = {
      type: counterTypeSut,
      targetPlayerId: counterOpponentId,
      value: 10
    }

    const counterOpponentSut = {
      name: counterOpponentNameSut,
      id: counterOpponentId,
      color: PlayerColors.green
    } as FirebasePlayerDto;

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
            playerColor={PlayerColors.blue} 
            counter={counterSut}
            counterOpponent={counterOpponentSut}
          />
        </Router>
      </Provider>,
    );

    const counterOpponentNameText = screen.queryByText(counterOpponentNameSut);
    expect(counterOpponentNameText).not.toBeInTheDocument()
  });

  it('CounterType Poison should not show counter opponent name ', () => {
    const counterTypeSut: CounterTypes = "Poison"
    const counterOpponentNameSut = "counterOpponentNameTest"
    const counterOpponentId = 'counterOpponentIdTest'

    const counterSut: FirebaseCounterDto = {
      type: counterTypeSut,
      targetPlayerId: counterOpponentId,
      value: 10
    }

    const counterOpponentSut = {
      name: counterOpponentNameSut,
      id: counterOpponentId,
      color: PlayerColors.green
    } as FirebasePlayerDto;

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
            playerColor={PlayerColors.blue} 
            counter={counterSut}
            counterOpponent={counterOpponentSut}
          />
        </Router>
      </Provider>,
    );

    const counterOpponentNameText = screen.queryByText(counterOpponentNameSut);
    expect(counterOpponentNameText).not.toBeInTheDocument()
  });

  it('CounterType CommanderDamage should show counterOpponent name ', () => {
    const counterTypeSut: CounterTypes = "CommanderDamage"
    const counterOpponentNameSut = "counterOpponentNameTest"
    const counterOpponentId = 'counterOpponentIdTest'

    const counterSut: FirebaseCounterDto = {
      type: counterTypeSut,
      targetPlayerId: counterOpponentId,
      value: 10
    }

    const counterOpponentSut = {
      name: counterOpponentNameSut,
      id: counterOpponentId,
      color: PlayerColors.green
    } as FirebasePlayerDto;

    const { container } = render(
      <Provider store={counterCarrouselItemStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrouselItem 
            playerColor={PlayerColors.blue} 
            counter={counterSut}
            counterOpponent={counterOpponentSut}
          />
        </Router>
      </Provider>,
    );

    const counterOpponentNameText = screen.queryByText(counterOpponentNameSut);
    expect(counterOpponentNameText).toBeInTheDocument()
  });
});

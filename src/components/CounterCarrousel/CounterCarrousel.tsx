import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { useCounter } from '../../hooks/counter/counterHook';
import SCCounterCarrousel from './CounterCarrousel.style';
import CounterCarrouselItem from '../CounterCarrouselItem/CounterCarrouselItem';

function CounterCarrousel(
  { player, isRotated, isResume } :
  { player: FirebasePlayerDto, isRotated: boolean, isResume?: boolean},
) {
  const [currentCounter, setCurrentCounter] = useState<FirebaseCounterDto>(player.counters[0]);
  const {
    temporaryCount, addCounters, removeCounters, getCounterOpponent,
  } = useCounter(player, currentCounter);

  const handleCarrouselChange = (index: any, element: any) => {
    setCurrentCounter(player.counters[index]);
  };

  return (
    <SCCounterCarrousel playerColor={player.color} isResume={isResume}>
      {!isResume && (
      <div className="CounterCarrousel_ActionContainer">
        <button
          type="button"
          aria-label="removeCounters"
          className="btn btn-link"
          onTouchStart={removeCounters}
        >
          <i className="bi bi-dash-circle-fill" />
        </button>
      </div>
      )}

      <div className="CounterCarrousel_Carrousel">
        <div className="CounterCarrousel_TemporaryCount">
          { temporaryCount !== 0 && (
            <p className="app_font_m app_font_noMargin">{temporaryCount}</p>
          )}
        </div>
        <div className="CounterCarrousel_CarrouselContainer">
          <Carousel
            axis={isRotated ? 'horizontal' : 'vertical'}
            onChange={handleCarrouselChange}
            infiniteLoop
            showStatus={false}
            dynamicHeight
            showThumbs={false}
            swipeable={temporaryCount === 0}
            verticalSwipe={isRotated ? 'natural' : 'standard'}
            emulateTouch
            showIndicators={false}
            showArrows={false}
            preventMovementUntilSwipeScrollTolerance
          >
            { player.counters.map((counter: FirebaseCounterDto) => (
              <div
                className="CounterCarrousel_CarrouselItemContainer"
                key={counter.type + counter.targetPlayerId}
              >
                <CounterCarrouselItem
                  counter={counter}
                  counterOpponent={getCounterOpponent(counter.targetPlayerId)}
                  playerColor={player.color}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      {!isResume && (
      <div className="CounterCarrousel_ActionContainer">
        <button
          disabled={isResume}
          type="button"
          aria-label="addCounters"
          className="btn btn-link"
          onTouchStart={addCounters}
        >
          <i className="bi bi-plus-circle-fill" />
        </button>
      </div>
      )}

    </SCCounterCarrousel>
  );
}

export default CounterCarrousel;

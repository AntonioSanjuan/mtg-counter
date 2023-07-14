import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { useCounter } from '../../hooks/counter/counterHook';
import SCCounterCarrousel from './CounterCarrousel.style';

function CounterCarrousel(
  { player, isRotated, minified } :
  { player: FirebasePlayerDto, isRotated: boolean, minified?: boolean},
) {
  const [currentCounter, setCurrentCounter] = useState<FirebaseCounterDto>(player.counters[0]);
  const { temporaryCount, addCounters, removeCounters } = useCounter(player, currentCounter);

  const handleCarrouselChange = (index: any, element: any) => {
    setCurrentCounter(player.counters[index]);
  };

  return (
    <SCCounterCarrousel playerColor={player.color}>
      {!minified && (
      <div className="CounterCarrousel_ActionContainer">
        <button
          type="button"
          aria-label="removeCounters"
          className="btn btn-link"
          onClick={removeCounters}
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
        <Carousel
          axis={isRotated ? 'horizontal' : 'vertical'}
          onChange={handleCarrouselChange}
          infiniteLoop
          showStatus={false}
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
              key={counter.type}
            >
              <div className="CounterCarrousel_CarrouselItem">
                <p className="app_font_m">
                  {counter.type === 'Poison'
                    && (<i className="bi bi-radioactive" />)}
                  {counter.type === 'Life'
                    && (<i className="bi bi-heart-fill" />)}
                  {counter.type === 'CommanderDamage'
                    && (<i className="bi bi-lightning-charge-fill" />
                    ) }
                </p>
                <p className="app_font_xl">
                  {counter.value}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {!minified && (
      <div className="CounterCarrousel_ActionContainer">
        <button
          disabled={minified}
          type="button"
          aria-label="addCounters"
          className="btn btn-link"
          onClick={addCounters}
        >
          <i className="bi bi-plus-circle-fill" />
        </button>
      </div>
      )}

    </SCCounterCarrousel>
  );
}

export default CounterCarrousel;

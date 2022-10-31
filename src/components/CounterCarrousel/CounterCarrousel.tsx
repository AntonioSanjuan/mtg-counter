import { Carousel } from 'react-responsive-carousel';
import './CounterCarrousel.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { useCounterHook } from '../../hooks/counter/counterHook';

function CounterCarrousel({ player, isRotated } : { player: FirebasePlayerDto, isRotated: boolean}) {
  const [currentCounter, setCurrentCounter] = useState<FirebaseCounterDto>(player.counters[0]);
  const { temporaryCount, addCounters, removeCounters } = useCounterHook(player, currentCounter);

  const handleCarrouselChange = (index: any, element: any) => {
    setCurrentCounter(player.counters[index]);
  };

  return (
    <div className="CounterCarrousel_MainContainer">
      <div className="CounterCarrousel_ActionContainer">
        <button type="button" onClick={addCounters}>
          <i className="bi bi-plus" />
        </button>
      </div>

      <div className="CounterCarrousel_Carrousel">
        <div className="CounterCarrousel_TemporaryCount">
          { temporaryCount !== 0 && (
            <p>{temporaryCount}</p>
          )}
        </div>
        <Carousel
          axis={isRotated ? 'horizontal' : 'vertical'}
          dynamicHeight
          onChange={handleCarrouselChange}
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
            <div>
              <div className="CounterCarrousel_CarrouselItem">
                <p>
                  {counter.type}
                </p>
                <p>
                  {counter.value}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="CounterCarrousel_ActionContainer">
        <button type="button" onClick={removeCounters}>
          <i className="bi bi-dash" />

        </button>
      </div>

    </div>
  );
}

export default CounterCarrousel;

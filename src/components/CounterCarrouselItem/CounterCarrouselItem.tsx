import { FirebaseCounterDto, FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import Chip from '../common/chip/chip';
import SCCounterCarrouselItem from './CounterCarrouselItem.style';

function CounterCarrouselItem({ playerColor, counter, counterOpponent } : {
    playerColor: PlayerColors,
    counter: FirebaseCounterDto,
    counterOpponent?: FirebasePlayerDto}) {
  return (
    <SCCounterCarrouselItem playerColor={playerColor} counterOpponentColor={counterOpponent?.color}>
      {counter.type === 'Poison'
        && (<i className="bi bi-droplet-half" />)}
      {counter.type === 'Life'
        && (<i className="bi bi-heart-pulse-fill app_font_s" />)}
      {counter.type === 'CommanderDamage'
        && (
          <Chip backgroundColor={counterOpponent?.color}>
            <p className="app_font_l app_font_noMargin">{counterOpponent?.name || '-'}</p>
          </Chip>
        )}

      <p className="app_font_xxl">
        {counter.value}
      </p>
    </SCCounterCarrouselItem>
  );
}

export default CounterCarrouselItem;

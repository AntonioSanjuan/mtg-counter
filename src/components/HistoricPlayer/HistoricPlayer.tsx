import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import SCPlayer from '../Player/Player.style';

function HistoricPlayer({ player } : {player: FirebasePlayerDto}) {
  return (
    <SCPlayer
      rotation={0}
      backgroundColor={player.color}
    >
      <CounterCarrousel player={player} isRotated={false} minified />
    </SCPlayer>
  );
}

export default HistoricPlayer;

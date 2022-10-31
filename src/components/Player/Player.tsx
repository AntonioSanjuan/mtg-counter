import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import './Player.scss';

function Player({ player, rotation } : {player: FirebasePlayerDto, rotation: number}) {
  return (
    <div
      className="Player_MainContainer"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <CounterCarrousel player={player} isRotated={rotation !== 0} />

    </div>
  );
}

export default Player;

import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import './Player.scss';

function Player({ player } : {player: FirebasePlayerDto}) {
  return (
    <div className="Player_MainContainer">
      <CounterCarrousel player={player} />

    </div>
  );
}

export default Player;

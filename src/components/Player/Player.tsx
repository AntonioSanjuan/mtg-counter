import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import './Player.scss';

function Player({ player } : {player: FirebasePlayerDto}) {
  return (
    <div className="Player_MainContainer">
      {player.counters[0].type}
      {player.counters[0].value}
    </div>
  );
}

export default Player;

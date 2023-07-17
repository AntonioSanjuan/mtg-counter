import { usePlayer } from '../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import SCPlayer from '../Player/Player.style';

function MinifiedPlayer(
  { player, showWinner, winnerSelection } :
  {player: FirebasePlayerDto, showWinner:boolean, winnerSelection: boolean},
) {
  const { updatePlayerWinner } = usePlayer(player);

  return (
    <SCPlayer
      rotation={0}
      backgroundColor={player.color}
      isOwner={player.owner}
      onClick={winnerSelection ? updatePlayerWinner : undefined}
    >
      {showWinner ? (
        <div className="Player_NameContainer">
          {player.winner && (<i className="bi bi-award-fill" />)}
          <p className="app_font_m app_font_noMargin">{player.name || '-'}</p>
        </div>
      ) : (
        <CounterCarrousel player={player} isRotated={false} isResume />
      )}
    </SCPlayer>
  );
}

export default MinifiedPlayer;

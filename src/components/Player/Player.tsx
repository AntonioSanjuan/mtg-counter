import {
  useRef, useLayoutEffect, useState,
} from 'react';

import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGame.model';
import PlayerConfig from '../PlayerConfig/PlayerConfig';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import SCPlayer from './Player.style';
import Chip from '../common/chip/chip';

function Player({ player, rotation } : {player: FirebasePlayerDto, rotation: number}) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = useState({ height: NaN, width: NaN });
  const [isPlayerConfigOpened, setIsPlayerConfigOpened] = useState(false);

  const calculateSizes = () => {
    if (playerRef.current) {
      setSizes({
        height: rotation ? playerRef.current.offsetHeight : playerRef.current.offsetWidth,
        width: rotation ? playerRef.current.offsetWidth : playerRef.current.offsetHeight,
      });
    }
  };

  useLayoutEffect(() => {
    calculateSizes();
  }, []);

  return (
    <SCPlayer
      rotation={rotation}
      playerHeight={sizes.width}
      playerWidth={sizes.height}
      backgroundColor={player.color}
      isOwner={player.owner}
      ref={playerRef}
    >
      <div className="PlayerName">
        <Chip backgroundColor={player.color}>
          <p className="app_font_l app_font_noMargin">{player?.name || '-'}</p>
        </Chip>
      </div>
      <button
        type="button"
        aria-label="configButton"
        className="btn btn-link Player_ConfigButton"
        onTouchStart={() => {
          setIsPlayerConfigOpened(!isPlayerConfigOpened);
        }}
      >
        <i className="bi bi-gear-fill" />
      </button>
      {isPlayerConfigOpened ? (
        <PlayerConfig
          player={player}
          onPick={() => {
            setIsPlayerConfigOpened(!isPlayerConfigOpened);
          }}
        />
      ) : (
        <CounterCarrousel player={player} isRotated={rotation !== 0} />
      )}
    </SCPlayer>
  );
}

export default Player;

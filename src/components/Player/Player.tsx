import {
  useRef, useEffect, useLayoutEffect, useState,
} from 'react';
import { usePlayer } from '../../hooks/player/playerHook';

import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import ColorPicker from '../ColorPicker/ColorPicker';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import SCPlayer from './Player.style';

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
      ref={playerRef}
    >
      <button
        type="button"
        aria-label="configButton"
        className="btn btn-link Player_ConfigButton"
        onClick={() => {
          setIsPlayerConfigOpened(!isPlayerConfigOpened);
        }}
      >
        <i className="bi bi-gear-fill" />
      </button>
      {isPlayerConfigOpened && (
        <ColorPicker player={player} />
      )}
      {!isPlayerConfigOpened && (
        <CounterCarrousel player={player} isRotated={rotation !== 0} />
      )}
    </SCPlayer>
  );
}

export default Player;

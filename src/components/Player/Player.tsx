import {
  useRef, useEffect, useLayoutEffect, useState,
} from 'react';

import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import './Player.scss';

function Player({ player, rotation } : {player: FirebasePlayerDto, rotation: number}) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = useState({ height: NaN, width: NaN });

  if (!Number.isNaN(sizes.height)) {
    console.log('calculationg sizes for player: ', player.id, playerRef.current?.offsetHeight);
  }

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
    <div
      ref={playerRef}
      style={
        {
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center',
          height: sizes.width,
          width: sizes.height,
        }
      }
      className="Player_MainContainer"
    >
      <CounterCarrousel player={player} isRotated={rotation !== 0} />
    </div>
  );
}

export default Player;

import { useRef, useEffect, useState } from 'react';

import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import CounterCarrousel from '../CounterCarrousel/CounterCarrousel';
import './Player.scss';

function Player({ player, rotation } : {player: FirebasePlayerDto, rotation: number}) {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = useState({ height: NaN, width: NaN });

  useEffect(() => {
    console.log('🚀 ~ file: Player.tsx ~ line 8 ~ Player ~ playerRef', playerRef);
    if (playerRef.current) {
      setSizes({ height: playerRef.current.offsetHeight, width: playerRef.current.offsetWidth });
    }
  }, [playerRef]);

  return (
    <div
      ref={playerRef}
      style={
        {
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center',
          height: sizes.width,
        }
      }
      className="Player_MainContainer"
    >
      <CounterCarrousel player={player} isRotated={rotation !== 0} />
    </div>
  );
}

export default Player;

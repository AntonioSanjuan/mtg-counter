import { useEffect, useState } from 'react';
import { usePlayer } from '../../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { useAlert } from '../../../hooks/alert/alertHook';
import SCPlayerDetails from './playerDetails.style';
import Chip from '../chip/chip';
import PlayerOwnerDetailsForm from '../playerOwnerDetailsForm/playerOwnerDetailsForm';
import { auth } from '../../../utils/firebase.util';
import PlayerGuestDetailsForm from '../playerGuestDetailsForm/playerGuestDetailsForm';
import { selectGamePlayersById } from '../../../state/game/game.selectors';
import { useAppSelector } from '../../../hooks/state/appStateHook';

function PlayerDetails({ playerId }: {playerId: string}) {
  const player = useAppSelector<FirebasePlayerDto|undefined>(selectGamePlayersById(playerId)) as FirebasePlayerDto;

  const [playerDetails, setPlayerDetails] = useState<PlayerDetailsModel>(getPlayerDetails());

  const { updatePlayerDetails } = usePlayer(player);
  const { closeAlert } = useAlert();

  const getPlayerDetails = (): PlayerDetailsModel => {
    const details: PlayerDetailsModel = {
      userId: player.userId ?? null,
      name: player.name ?? '',
      deckName: player.deckName ?? '',
    };
    return details;
  };

  const fetchPlayerDetails = (): void => {
    const details = getPlayerDetails();
    setPlayerDetails(details);
  };

  useEffect(() => {
    fetchPlayerDetails();
  }, [player]);

  const formSubmit = (playerDetails: PlayerDetailsModel) => {
    updatePlayerDetails(playerDetails).then(() => {
      closeAlert();
    });
  };

  const getPlayerDetailsForm = (): JSX.Element => {
    if (auth.currentUser && player.owner) {
      return (
        <PlayerOwnerDetailsForm
          submit={formSubmit}
          playerDetails={playerDetails}
        />
      );
    }
    return (
      <PlayerGuestDetailsForm
        submit={formSubmit}
        playerDetails={playerDetails}
      />
    );
  };

  return (
    <SCPlayerDetails>
      <div className="PlayerDetails_Header">
        <Chip backgroundColor={player.color}>
          <p className="app_font_l app_font_noMargin">{player?.name || '-'}</p>
        </Chip>
      </div>
      <hr />
      {getPlayerDetailsForm()}
    </SCPlayerDetails>

  );
}
export default PlayerDetails;

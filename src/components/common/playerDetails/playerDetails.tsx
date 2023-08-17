import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import { useEffect } from 'react';
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

  const { updatePlayerDetails } = usePlayer(player);

  const { closeAlert } = useAlert();

  const getPlayerDetails = (): PlayerDetailsModel => {
    const playerDetails: PlayerDetailsModel = {
      userId: player.userId ?? null,
      name: player.name ?? '',
      deckName: player.deckName ?? '',
    };
    return playerDetails;
  };

  useEffect(() => {
    formik.setValues(getPlayerDetails());
  }, [player]);

  const formik: FormikProps<PlayerDetailsModel> = useFormik<PlayerDetailsModel>({
    initialValues: getPlayerDetails(),
    validationSchema: Yup.object({
      userId: Yup.string().nullable(),
      name: Yup.string(),
      deckName: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      savePlayerDetails(values).then(() => {
        resetForm();
        closeAlert();
      });
    },
  });

  const savePlayerDetails = async (form: PlayerDetailsModel) => {
    await updatePlayerDetails(form);
  };

  const getPlayerDetailsForm = (): JSX.Element => {
    if (auth.currentUser && player.owner) {
      return <PlayerOwnerDetailsForm formik={formik} />;
    }
    return (
      <PlayerGuestDetailsForm
        formik={formik}
        save={savePlayerDetails}
        playerUserId={player.userId}
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

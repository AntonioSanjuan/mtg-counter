import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import { usePlayer } from '../../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { useAlert } from '../../../hooks/alert/alertHook';
import SCPlayerDetails from './playerDetails.style';
import Chip from '../chip/chip';
import PlayerOwnerDetailsForm from '../playerOwnerDetailsForm/playerOwnerDetailsForm';
import { auth } from '../../../utils/firebase.util';
import PlayerGuestDetailsForm from '../playerGuestDetailsForm/playerGuestDetailsForm';

function PlayerDetails({ player }: {player: FirebasePlayerDto}) {
  const { updatePlayerDetails } = usePlayer(player);

  const { closeAlert } = useAlert();

  const formik: FormikProps<PlayerDetailsModel> = useFormik<PlayerDetailsModel>({
    initialValues: {
      userId: player.userId ?? null,
      name: player.name ?? '',
      deckName: player.deckName ?? '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().nullable(),
      name: Yup.string(),
      deckName: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      savePlayerDetails(values).then(() => {
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
    return <PlayerGuestDetailsForm formik={formik} save={savePlayerDetails} />;
  };

  return (
    <SCPlayerDetails>
      <div className="PlayerDetails_Header">
        <Chip backgroundColor={player.color}>
          <p className="app_font_l app_font_noMargin">{player?.name || '-'}</p>
        </Chip>
      </div>
      {getPlayerDetailsForm()}
    </SCPlayerDetails>

  );
}
export default PlayerDetails;

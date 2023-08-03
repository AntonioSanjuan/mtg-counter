import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import { usePlayer } from '../../../hooks/player/playerHook';
import { FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { useAlert } from '../../../hooks/alert/alertHook';
import SCPlayerDetails from './playerDetails.style';
import Chip from '../chip/chip';
import PlayerDetailsOwnerForm from '../playerDetailsOwnerForm/playerDetailsOwnerForm';

function PlayerDetails({ player }: {player: FirebasePlayerDto}) {
  const { updatePlayerDetails } = usePlayer(player);

  const { closeAlert } = useAlert();

  const formik: FormikProps<PlayerDetailsModel> = useFormik<PlayerDetailsModel>({
    initialValues: {
      // userId: player.userId ?? '',
      name: player.name ?? '',
      deckName: player.deckName ?? '',
    },
    validationSchema: Yup.object({
      // userId: Yup.string().test('VALID', 'Error!', async () => Promise.resolve(false)),
      name: Yup.string(),
      deckName: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleSubmit(values).then(() => {
        closeAlert();
      });
    },
  });

  const handleSubmit = async (form: PlayerDetailsModel) => {
    await updatePlayerDetails(form);
  };

  const getPlayerDetailsForm = (): JSX.Element => {
    if (player.owner && ) {
      return <PlayerDetailsOwnerForm formik={formik} />;
    } if (player.userId) {
      // to-do
      return <PlayerDetailsOwnerForm formik={formik} />;
    }
    // to-do
    return <PlayerDetailsOwnerForm formik={formik} />;
  };
  return (
    <SCPlayerDetails>
      <div className="PlayerDetails_Header">
        <Chip backgroundColor={player.color}>
          <p className="app_font_l app_font_noMargin">{player?.name || '-'}</p>
        </Chip>
      </div>
      {getPlayerDetailsForm()}
      {/* <form onSubmit={formik.handleSubmit}>
        {/* <div className="form-floating">

          <label htmlFor="userId">
            userId
            <div className="PlayerDetails_UserIdContainer">
              <input
                type="text"
                id="userId"
                name="userId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId as string}
                // disabled
                className="form-control"
                placeholder="rubio#1234"
              />
              <button
                type="button"
                aria-label="configButton"
                className="btn btn-link Player_ConfigButton"
                onClick={() => {
                  // setIsPlayerConfigOpened(!isPlayerConfigOpened);
                }}
              >
                <i className="bi bi-gear-fill" />
              </button>
            </div>
          </label>

          {
          formik.touched.userId && formik.errors.userId
          && <span className="app_font_error">{formik.errors.userId}</span>
        }
        </div> */}
      {/* <div className="form-floating">

          <label htmlFor="name">
            Player name
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
              placeholder="rubio"
            />
          </label>
          {
          formik.touched.name && formik.errors.name
          && <span className="app_font_error">{formik.errors.name}</span>
        }
        </div>
        <div className="form-floating">

          <label htmlFor="deckName">
            Deck name
            <input
              type="text"
              id="deckName"
              name="deckName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deckName}
              className="form-control"
              placeholder="Pium! Pium!"
            />
          </label>
          {
          formik.touched.deckName && formik.errors.deckName
          && <span className="app_font_error">{formik.errors.deckName}</span>
        }
        </div>
        <div>
          <button
            disabled={!formik.dirty || !formik.isValid}
            className="btn btn-primary w-100"
            type="submit"
          >
            Save details
          </button>
        </div>
      </form> } */}
    </SCPlayerDetails>

  );
}
export default PlayerDetails;

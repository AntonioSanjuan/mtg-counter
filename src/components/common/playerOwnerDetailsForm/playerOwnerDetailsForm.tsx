import { FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { selectDeckCollection } from '../../../state/deckCollection/deckCollection.selectors';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { useAlert } from '../../../hooks/alert/alertHook';

function PlayerOwnerDetailsForm(
  { formik }:
  { formik: FormikProps<PlayerDetailsModel>},
) {
  const deckCollection = useAppSelector<DeckCollectionState>(selectDeckCollection);
  const { closeAlert } = useAlert();
  return (

    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">Configura tu perfil</p>
      <div className="form-floating">

        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">Player name</p>
          <input
            type="text"
            id="name"
            disabled
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
      {deckCollection.decks.length > 0 ? (
        <div className="form-floating">
          <label htmlFor="deckName">
            <p className="app_font_m app_font_noMargin">Deck name</p>
            <select
              className="form-select"
              id="deckName"
              aria-label="deckName"
              name="deckName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deckName}
            >
              <option disabled value="">Select deck</option>
              {deckCollection.decks.map((deck: FirebaseDeckDto) => (
                <option value={deck.name}>{deck.name}</option>
              ))}
            </select>
          </label>
          {
        formik.touched.deckName && formik.errors.deckName
        && <span className="app_font_error">{formik.errors.deckName}</span>
      }
        </div>
      ) : (
        <Link to="/deckCollection">
          <button
            className="btn btn-link w-100"
            onClick={closeAlert}
            type="button"
          >
            No tienes decks, Para añadirlos pulsa aqui
          </button>
        </Link>
      )}

      <div>
        <button
          disabled={!formik.dirty || !formik.isValid}
          className="btn btn-primary w-100"
          type="submit"
        >
          Save details
        </button>
      </div>
    </form>

  );
}
export default PlayerOwnerDetailsForm;

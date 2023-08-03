import { FormikProps } from 'formik';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

function PlayerGuestLinkedDetailsForm(
  { formik, playerDeckCollection }:
  { formik: FormikProps<PlayerDetailsModel>, playerDeckCollection: DeckCollectionState},
) {
  return (

    <form onSubmit={formik.handleSubmit}>
      <div className="form-floating">

        <label htmlFor="name">
          Player name
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
      <div className="form-floating">

        <label htmlFor="deckName">
          Deck name
          <select
            className="form-select"
            id="deckName"
            aria-label="deckName"
            name="deckName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deckName}
          >
            {playerDeckCollection.decks.map((deck: FirebaseDeckDto) => (
              <option value={deck.name}>{deck.name}</option>
            ))}
          </select>
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
    </form>

  );
}

export default PlayerGuestLinkedDetailsForm;

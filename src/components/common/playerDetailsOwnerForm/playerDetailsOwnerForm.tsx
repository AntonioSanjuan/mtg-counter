import { FormikProps } from 'formik';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { selectDeckCollection } from '../../../state/deckCollection/deckCollection.selectors';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

function PlayerDetailsOwnerForm(
  { formik }:
  { formik: FormikProps<PlayerDetailsModel>},
) {
  const deckCollection = useAppSelector<DeckCollectionState>(selectDeckCollection);

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
            {deckCollection.decks.map((deck: FirebaseDeckDto) => (
              <option value={deck.name}>deck.name</option>
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
export default PlayerDetailsOwnerForm;

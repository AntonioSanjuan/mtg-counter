import { FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">{t('modals.playerDetails.owner.title')}</p>
      <div className="form-floating">

        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">{t('modals.playerDetails.owner.form.userName.label')}</p>
          <input
            type="text"
            id="name"
            disabled
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control"
            placeholder={t('modals.playerDetails.owner.form.userName.placeholder')}
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
            <p className="app_font_m app_font_noMargin">{t('modals.playerDetails.owner.form.deckName.label')}</p>
            <select
              className="form-select"
              id="deckName"
              aria-label="deckName"
              name="deckName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deckName}
            >
              <option disabled value="">{t('modals.playerDetails.owner.form.deckName.options.default')}</option>
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
            {t('modals.playerDetails.owner.actions.goToDeckCollection')}
          </button>
        </Link>
      )}

      <div className="PlayerDetails_ActionContainer">
        <button
          disabled={!formik.dirty || !formik.isValid}
          className="btn btn-primary w-100"
          type="submit"
        >
          {t('modals.playerDetails.commonActions.saveDetails')}
        </button>
      </div>
    </form>

  );
}
export default PlayerOwnerDetailsForm;

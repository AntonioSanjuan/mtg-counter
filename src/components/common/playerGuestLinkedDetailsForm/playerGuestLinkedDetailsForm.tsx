import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';

function PlayerGuestLinkedDetailsForm(
  {
    formik,
    playerDeckCollection,
    unLinkPlayer,
  }:
  { formik: FormikProps<PlayerDetailsModel>,
    playerDeckCollection: DeckCollectionState,
    unLinkPlayer: any
  },
) {
  const { t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">{t('modals.playerDetails.guest.linked.title')}</p>
      <div className="form-floating">
        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">{t('modals.playerDetails.guest.linked.form.playerName.label')}</p>
          <input
            type="text"
            id="name"
            disabled
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control"
            placeholder={t('modals.playerDetails.guest.linked.form.playerName.placeholder')}
          />
        </label>
        {
          formik.touched.name && formik.errors.name
          && <span className="app_font_error">{formik.errors.name}</span>
        }
      </div>
      <div className="form-floating">

        <label htmlFor="deckName">
          <p className="app_font_m app_font_noMargin">{t('modals.playerDetails.guest.linked.form.deckName.label')}</p>
          <select
            className="form-select"
            id="deckName"
            aria-label="deckName"
            name="deckName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deckName}
          >
            <option disabled value="">{t('modals.playerDetails.guest.linked.form.deckName.options.default')}</option>
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
      <div className="PlayerDetails_ActionContainer">
        <button
          disabled={!formik.isValid}
          className="btn btn-primary w-100"
          type="submit"
        >
          {t('modals.playerDetails.commonActions.saveDetails')}
        </button>
        <button
          disabled={!formik.isValid}
          className="btn btn-danger w-100"
          type="button"
          onClick={unLinkPlayer}
        >
          {t('modals.playerDetails.guest.linked.actions.unlink')}
        </button>
      </div>
    </form>

  );
}

export default PlayerGuestLinkedDetailsForm;

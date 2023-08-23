import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';

function PlayerGuestAnonymousDetailsForm(
  { formik }:
  { formik: FormikProps<PlayerDetailsModel>},
) {
  const { t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">{t('modals.playerDetails.guest.anonymous.title')}</p>
      <div className="form-floating">
        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">
            {t('modals.playerDetails.guest.anonymous.form.playerName.label')}
          </p>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control"
            placeholder={t('modals.playerDetails.guest.anonymous.form.playerName.placeholder')}
          />
        </label>
        {
    formik.touched.name && formik.errors.name
    && <span className="app_font_error">{formik.errors.name}</span>
  }
      </div>
      <div className="form-floating">

        <label htmlFor="deckName">
          <p className="app_font_m app_font_noMargin">
            {t('modals.playerDetails.guest.anonymous.form.deckName.label')}
          </p>

          <input
            className="form-control"
            id="deckName"
            aria-label="deckName"
            name="deckName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deckName}
            placeholder={t('modals.playerDetails.guest.anonymous.form.deckName.placeholder')}
          />
        </label>
        {
    formik.touched.deckName && formik.errors.deckName
    && <span className="app_font_error">{formik.errors.deckName}</span>
  }
      </div>
      <div className="PlayerDetails_ActionContainer">
        <button
          disabled={!formik.dirty || !formik.isValid}
          className="btn btn-primary w-100"
          type="submit"
          aria-label="PlayerGuestAnonymousDetailsFormSubmit"
          name="PlayerGuestAnonymousDetailsFormSubmit"
        >
          {t('modals.playerDetails.commonActions.saveDetails')}
        </button>
      </div>
    </form>

  );
}

export default PlayerGuestAnonymousDetailsForm;

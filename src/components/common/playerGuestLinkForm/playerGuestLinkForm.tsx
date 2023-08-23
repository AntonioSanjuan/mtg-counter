import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';

function PlayerGuestLinkForm(
  {
    formik,
    linkPlayer,
  }:
  { formik: FormikProps<PlayerDetailsModel>,
    linkPlayer: any},
) {
  const { t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">{t('modals.playerDetails.guest.linking.title')}</p>
      <div className="form-floating">
        <label htmlFor="userId">
          <p className="app_font_m app_font_noMargin">{t('modals.playerDetails.guest.linking.form.userName.label')}</p>
          <div className="PlayerDetails_UserIdContainer">
            <input
              type="text"
              id="userId"
              name="userId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder={t('modals.playerDetails.guest.linking.form.userName.placeholder')}
            />
            <button
              type="button"
              aria-label="configButton"
              className="btn btn-link Player_ConfigButton"
              onClick={linkPlayer}
            >
              <i className="bi bi-plugin" />
            </button>
          </div>
        </label>

        {
  formik.touched.userId && formik.errors.userId
  && <span className="app_font_error">{formik.errors.userId}</span>
}
      </div>
    </form>
  );
}

export default PlayerGuestLinkForm;

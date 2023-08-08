import { FormikProps } from 'formik';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';

function PlayerGuestLinkForm(
  {
    formik,
    isValidPlayerLink,
    linkPlayer,
  }:
  { formik: FormikProps<PlayerDetailsModel>,
    isValidPlayerLink: boolean,
    linkPlayer: any },
) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">Carga y valida tu perfil</p>

      <div className="form-floating">

        <label htmlFor="userId">
          <p className="app_font_m app_font_noMargin">userId</p>
          <div className="PlayerDetails_UserIdContainer">
            <input
              type="text"
              id="userId"
              name="userId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userId as string}
              className="form-control"
              placeholder="rubio#1234"
            />
            <button
              type="button"
              aria-label="configButton"
              className="btn btn-link Player_ConfigButton"
              onClick={linkPlayer}
            >
              <i className="bi bi-gear-fill" />
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

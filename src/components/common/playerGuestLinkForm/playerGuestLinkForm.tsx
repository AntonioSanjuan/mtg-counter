import { FormikProps } from 'formik';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';

function PlayerGuestLinkForm(
  {
    formik,
    linkPlayer,
  }:
  { formik: FormikProps<PlayerDetailsModel>,
    linkPlayer: any},
) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">Configura tu perfil vinculando un usuario</p>
      <div className="form-floating">
        <label htmlFor="userId">
          <p className="app_font_m app_font_noMargin">User Name</p>
          <div className="PlayerDetails_UserIdContainer">
            <input
              type="text"
              id="userId"
              name="userId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
              placeholder="rubio#1234"
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
